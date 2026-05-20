import React from 'react';

/* ── Shared types ────────────────────────────────────────────────── */

export interface ColorSwatch {
  name: string;
  token: string;
  darkValue: string;
  lightValue: string;
}

export interface TypeRow {
  name: string;
  token: string;
  size: string;
  lineHeight: string;
  weight: string;
  sample: string;
  sampleStyle: React.CSSProperties;
}

/* ── Shared styles ───────────────────────────────────────────────── */

const vscFontFamily =
  '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 16,
};

const swatchContainerStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid var(--page-border-color, #333)',
};

const swatchLabelStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 12,
  lineHeight: 1.4,
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  fontFamily: vscFontFamily,
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 16px 8px 12px',
  borderBottom: '1px solid var(--page-border-color, #333)',
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  opacity: 0.6,
  color: 'var(--vscode-foreground)',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px 12px 12px',
  borderBottom: '1px solid var(--page-border-color, #333)',
  verticalAlign: 'middle',
  color: 'var(--vscode-foreground)',
};

const codeStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 12,
  padding: '2px 6px',
  borderRadius: 3,
  backgroundColor: 'var(--badge-bg, rgba(255,255,255,0.08))',
};

/* ── Color components ────────────────────────────────────────────── */

export const Swatch = ({ color }: { color: ColorSwatch }) => (
  <div style={swatchContainerStyle}>
    <div
      style={{
        height: 64,
        width: '100%',
        backgroundColor: `var(${color.token})`,
      }}
    />
    <div style={swatchLabelStyle}>
      <span
        style={{
          display: 'block',
          fontWeight: 600,
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        {color.name}
      </span>
      <span
        style={{
          display: 'block',
          fontFamily: 'monospace',
          fontSize: 10,
          opacity: 0.6,
          wordBreak: 'break-all',
        }}
      >
        var({color.token})
      </span>
      <span
        style={{
          display: 'block',
          fontFamily: 'monospace',
          fontSize: 10,
          opacity: 0.5,
          marginTop: 2,
        }}
      >
        Dark: {color.darkValue} · Light: {color.lightValue}
      </span>
    </div>
  </div>
);

export const ColorSection = ({
  title,
  description,
  colors,
}: {
  title: string;
  description?: string;
  colors: ColorSwatch[];
}) => (
  <div style={{ marginBottom: 48 }}>
    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{title}</h3>
    {description && (
      <p
        style={{
          fontSize: 13,
          opacity: 0.7,
          marginBottom: 24,
          lineHeight: 1.5,
          maxWidth: 640,
        }}
      >
        {description}
      </p>
    )}
    <div style={gridStyle}>
      {colors.map((c) => (
        <Swatch key={c.token} color={c} />
      ))}
    </div>
  </div>
);

/* ── Typography components ───────────────────────────────────────── */

export const TypeScaleTable = ({ rows }: { rows: TypeRow[] }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>Name</th>
        <th style={thStyle}>Token</th>
        <th style={thStyle}>Size / Line Height</th>
        <th style={thStyle}>Weight</th>
        <th style={thStyle}>Preview</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name}>
          <td style={tdStyle}>
            <strong>{row.name}</strong>
          </td>
          <td style={tdStyle}>
            <code style={codeStyle}>{row.token}</code>
          </td>
          <td style={tdStyle}>
            {row.size} / {row.lineHeight}
          </td>
          <td style={tdStyle}>{row.weight}</td>
          <td style={{ ...tdStyle, maxWidth: 260 }}>
            <span style={{ ...row.sampleStyle, fontFamily: vscFontFamily }}>
              {row.sample}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const FontWeightTable = () => {
  const weights = [
    { name: 'Regular', value: '400', usage: 'Body text, labels, descriptions' },
    { name: 'Medium', value: '500', usage: 'Secondary emphasis' },
    { name: 'Semibold', value: '600', usage: 'Headings, buttons, emphasis' },
    {
      name: 'Bold',
      value: '700',
      usage: 'Stronger variants (e.g. Body 1 Stronger)',
    },
  ];

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Weight</th>
          <th style={thStyle}>Value</th>
          <th style={thStyle}>Usage</th>
          <th style={thStyle}>Preview</th>
        </tr>
      </thead>
      <tbody>
        {weights.map((w) => (
          <tr key={w.name}>
            <td style={tdStyle}>
              <strong>{w.name}</strong>
            </td>
            <td style={tdStyle}>
              <code style={codeStyle}>{w.value}</code>
            </td>
            <td style={tdStyle}>{w.usage}</td>
            <td style={tdStyle}>
              <span
                style={{
                  fontWeight: Number(w.value),
                  fontSize: 14,
                  fontFamily: vscFontFamily,
                }}
              >
                {w.name} weight text
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const FontFamilyTable = () => {
  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Context</th>
          <th style={thStyle}>Font Stack</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tdStyle}>
            <strong>VS Code Override</strong>
          </td>
          <td style={tdStyle}>
            <code style={codeStyle}>
              "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, sans-serif
            </code>
          </td>
          <td style={tdStyle}>
            <span
              style={{
                ...tagStyle,
                backgroundColor: 'var(--vscode-button-background, #0078d4)',
                color: '#ffffff',
              }}
            >
              Changed
            </span>
          </td>
        </tr>
        <tr>
          <td style={tdStyle}>Fluent 2 Default</td>
          <td style={tdStyle}>
            <code style={codeStyle}>
              "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica
              Neue", sans-serif
            </code>
          </td>
          <td style={tdStyle}>
            <span
              style={{
                ...tagStyle,
                backgroundColor: 'var(--badge-bg, rgba(255,255,255,0.08))',
                color: 'var(--badge-text, #ccc)',
              }}
            >
              Original
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

/* ── Callout box ─────────────────────────────────────────────────── */

export const Callout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '16px 20px',
      borderRadius: 8,
      border: '1px solid var(--page-border-color, #333)',
      backgroundColor: 'var(--preview-bg, #252526)',
      marginBottom: 24,
      fontSize: 13,
      lineHeight: 1.6,
    }}
  >
    {children}
  </div>
);
