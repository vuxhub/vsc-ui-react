import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function command(executable, args) {
  return execFileSync(executable, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function git(args) {
  return command('git', args);
}

function gitBuffer(args) {
  return execFileSync('git', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function npm(args) {
  if (process.env.npm_execpath) {
    return command(process.execPath, [process.env.npm_execpath, ...args]);
  }

  return command('npm', args);
}

function splitLines(value) {
  return value ? value.split(/\r?\n/) : [];
}

export function parseVersion(version) {
  const match = VERSION_PATTERN.exec(version);

  if (!match) {
    throw new Error(`Invalid semantic version: ${version}`);
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

export function incrementVersion(version, bump) {
  const parsed = parseVersion(version);

  if (bump === 'minor') {
    return `${parsed.major}.${parsed.minor + 1}.0`;
  }

  if (bump === 'patch') {
    return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  }

  throw new Error(`Unsupported version bump: ${bump}`);
}

export function compareVersions(leftVersion, rightVersion) {
  const left = parseVersion(leftVersion);
  const right = parseVersion(rightVersion);

  for (const key of ['major', 'minor', 'patch']) {
    if (left[key] !== right[key]) {
      return left[key] - right[key];
    }
  }

  return 0;
}

export function getChangedComponents(changedFiles) {
  const components = new Set();

  for (const file of changedFiles) {
    const normalized = file.replaceAll('\\', '/');
    const match = /^src\/components\/([^/]+)\//.exec(normalized);

    if (match) {
      components.add(match[1]);
    }
  }

  return [...components].sort();
}

export function createVersionPlan(currentVersion, changedFiles) {
  const components = getChangedComponents(changedFiles);

  if (changedFiles.length === 0) {
    return {
      bump: 'none',
      componentCount: components.length,
      version: currentVersion,
    };
  }

  const bump = components.length >= 2 ? 'minor' : 'patch';

  return {
    bump,
    componentCount: components.length,
    version: incrementVersion(currentVersion, bump),
  };
}

export function findVersionIntroduction(version, history) {
  let introduction = null;

  for (const entry of history) {
    if (entry.version === version) {
      introduction = entry.commit;
      continue;
    }

    if (introduction) {
      break;
    }
  }

  return introduction;
}

function readPackage() {
  return JSON.parse(readFileSync('package.json', 'utf8'));
}

function versionAtRef(ref) {
  const packageJson = JSON.parse(git(['show', `${ref}:package.json`]));
  return packageJson.version;
}

function latestVersionTag() {
  const tags = splitLines(
    git(['tag', '--merged', 'HEAD', '--list', 'v*', '--sort=-version:refname']),
  );

  return tags.find((tag) => VERSION_PATTERN.test(tag.slice(1))) ?? null;
}

function npmErrorText(error) {
  return [error.stdout, error.stderr, error.message]
    .filter(Boolean)
    .map(String)
    .join('\n');
}

function isMissingPackageVersion(error) {
  return /E404|not found|No match found/i.test(npmErrorText(error));
}

function publishedVersion(spec) {
  let output;

  try {
    output = npm(['view', spec, 'version', '--json']);
  } catch (error) {
    if (isMissingPackageVersion(error)) {
      return null;
    }

    throw error;
  }

  const version = JSON.parse(output);

  if (typeof version !== 'string') {
    throw new Error(`Unexpected npm version response for ${spec}`);
  }

  parseVersion(version);
  return version;
}

function findVersionCommit(version) {
  const commits = splitLines(git(['log', '--format=%H', '--', 'package.json']));
  const history = commits.map((commit) => ({
    commit,
    version: versionAtRef(commit),
  }));

  return findVersionIntroduction(version, history);
}

function changedFilesSince(baseRef) {
  const output = gitBuffer([
    'diff',
    '--name-only',
    '-z',
    `${baseRef}..HEAD`,
    '--',
  ]);

  return output.toString('utf8').split('\0').filter(Boolean);
}

function assertTargetIsAvailable(packageName, version) {
  if (publishedVersion(`${packageName}@${version}`)) {
    throw new Error(
      `${packageName}@${version} exists without a matching release tag`,
    );
  }
}

function writeOutputs(outputs) {
  const text = Object.entries(outputs)
    .map(([key, value]) => `${key}=${value}\n`)
    .join('');

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, text);
    return;
  }

  console.log(JSON.stringify(outputs, null, 2));
}

function noReleasePlan(baseRef, version, sourceSha) {
  return {
    base_ref: baseRef,
    bump: 'none',
    component_count: 0,
    mode: 'none',
    release_ref: '',
    should_release: false,
    source_sha: sourceSha,
    version,
  };
}

function newReleasePlan({
  baseRef,
  changedFiles,
  currentVersion,
  packageName,
  sourceSha,
}) {
  const versionPlan = createVersionPlan(currentVersion, changedFiles);
  assertTargetIsAvailable(packageName, versionPlan.version);

  return {
    base_ref: baseRef,
    bump: versionPlan.bump,
    component_count: versionPlan.componentCount,
    mode: 'new',
    release_ref: 'HEAD',
    should_release: true,
    source_sha: sourceSha,
    version: versionPlan.version,
  };
}

export function planRelease() {
  const packageJson = readPackage();
  const currentVersion = packageJson.version;
  const packageName = packageJson.name;
  const sourceSha = git(['rev-parse', 'HEAD']);
  const releaseTag = latestVersionTag();

  parseVersion(currentVersion);

  if (releaseTag) {
    const tagVersion = releaseTag.slice(1);
    const taggedPackageVersion = versionAtRef(releaseTag);
    const taggedPublishedVersion = publishedVersion(
      `${packageName}@${tagVersion}`,
    );
    const latestPublishedVersion = publishedVersion(packageName);

    if (taggedPackageVersion !== tagVersion) {
      throw new Error(
        `${releaseTag} contains package version ${taggedPackageVersion}`,
      );
    }

    if (!taggedPublishedVersion) {
      if (
        latestPublishedVersion &&
        compareVersions(latestPublishedVersion, tagVersion) >= 0
      ) {
        throw new Error(
          `npm latest is ${latestPublishedVersion}, but ` +
            `${releaseTag} is unpublished`,
        );
      }

      return {
        base_ref: releaseTag,
        bump: 'none',
        component_count: 0,
        mode: 'resume',
        release_ref: releaseTag,
        should_release: true,
        source_sha: sourceSha,
        version: tagVersion,
      };
    }

    if (latestPublishedVersion !== tagVersion) {
      throw new Error(
        `npm latest is ${latestPublishedVersion}, but ` +
          `${releaseTag} is the latest tag`,
      );
    }

    if (currentVersion !== tagVersion) {
      throw new Error(
        `package.json is ${currentVersion}, but ${releaseTag} is latest`,
      );
    }

    const changedFiles = changedFilesSince(releaseTag);

    if (changedFiles.length === 0) {
      return noReleasePlan(releaseTag, currentVersion, sourceSha);
    }

    return newReleasePlan({
      baseRef: releaseTag,
      changedFiles,
      currentVersion,
      packageName,
      sourceSha,
    });
  }

  const currentPublishedVersion = publishedVersion(
    `${packageName}@${currentVersion}`,
  );
  const latestPublishedVersion = publishedVersion(packageName);

  if (currentPublishedVersion) {
    if (latestPublishedVersion !== currentVersion) {
      throw new Error(
        `package.json is ${currentVersion}, but npm latest is ` +
          latestPublishedVersion,
      );
    }

    const baseRef = findVersionCommit(currentVersion);

    if (!baseRef) {
      throw new Error(
        `Cannot find the commit for published version ${currentVersion}`,
      );
    }

    const changedFiles = changedFilesSince(baseRef);

    if (changedFiles.length === 0) {
      return noReleasePlan(baseRef, currentVersion, sourceSha);
    }

    return newReleasePlan({
      baseRef,
      changedFiles,
      currentVersion,
      packageName,
      sourceSha,
    });
  }

  if (latestPublishedVersion) {
    throw new Error(
      `package.json is ${currentVersion}, but npm is ` + latestPublishedVersion,
    );
  }

  return {
    base_ref: '',
    bump: 'none',
    component_count: 0,
    mode: 'initial',
    release_ref: 'HEAD',
    should_release: true,
    source_sha: sourceSha,
    version: currentVersion,
  };
}

function main() {
  writeOutputs(planRelease());
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
