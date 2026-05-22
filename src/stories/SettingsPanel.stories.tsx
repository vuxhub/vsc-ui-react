import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { VscButton } from '../components/Button';
import { VscInput } from '../components/Input';
import { VscTextarea } from '../components/Textarea';
import { VscDropdown, VscOption } from '../components/Dropdown';
import { VscField } from '../components/Field';
import { VscCheckbox } from '../components/Checkbox';
import { VscTabList, VscTab } from '../components/TabList';
import { VscSearchBox } from '../components/SearchBox';
import {
  SaveRegular,
  ArrowResetRegular,
  SettingsRegular,
} from '@fluentui/react-icons';

const meta: Meta = {
  title: 'Examples/Settings Panel',
  parameters: {
    docs: {
      description: {
        component:
          'A realistic VS Code–style settings panel composed from multiple vsc-ui-react components. Demonstrates how the components work together in a real-world layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ── Styles ──────────────────────────────────────────────────────── */

const panelStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 720,
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 16,
};

const titleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  margin: 0,
};

const searchRowStyle: React.CSSProperties = {
  marginBottom: 20,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 24,
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
  opacity: 0.6,
  marginBottom: 12,
};

const fieldGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const inlineFieldStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'flex-start',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
  paddingTop: 16,
  borderTop: '1px solid var(--vscode-panel-border, #444)',
};

const dividerStyle: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid var(--vscode-panel-border, #444)',
  margin: '8px 0 20px',
};

/* ── Story ───────────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Settings Panel',
  render: () => <SettingsPanel />,
};

function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div style={panelStyle}>
      {/* ── Header ─────────────────────────────────────────── */}
      <div style={headerStyle}>
        <SettingsRegular style={{ fontSize: 20, opacity: 0.7 }} />
        <h2 style={titleStyle}>Settings</h2>
      </div>

      {/* ── Search ─────────────────────────────────────────── */}
      <div style={searchRowStyle}>
        <VscSearchBox
          placeholder="Search settings..."
          style={{ width: '100%' }}
        />
      </div>

      {/* ── Tabs ───────────────────────────────────────────── */}
      <VscTabList
        selectedValue={activeTab}
        onTabSelect={(_, data) => setActiveTab(data.value as string)}
      >
        <VscTab value="editor">Editor</VscTab>
        <VscTab value="terminal">Terminal</VscTab>
        <VscTab value="files">Files</VscTab>
      </VscTabList>

      <hr style={dividerStyle} />

      {/* ── Editor tab ─────────────────────────────────────── */}
      {activeTab === 'editor' && (
        <>
          <div style={sectionStyle}>
            <div style={sectionHeadingStyle}>Font</div>
            <div style={fieldGroupStyle}>
              <VscField
                label="Font Family"
                tooltipContent="Controls the font family used in the editor."
              >
                <VscInput defaultValue="'Cascadia Code', 'Fira Code', monospace" />
              </VscField>

              <div style={inlineFieldStyle}>
                <VscField label="Font Size" style={{ flex: '0 0 100px' }}>
                  <VscInput type="number" defaultValue="14" />
                </VscField>
                <VscField label="Line Height" style={{ flex: '0 0 100px' }}>
                  <VscInput type="number" defaultValue="22" />
                </VscField>
                <VscField label="Tab Size" style={{ flex: '0 0 100px' }}>
                  <VscInput type="number" defaultValue="4" />
                </VscField>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionHeadingStyle}>Display</div>
            <div style={fieldGroupStyle}>
              <VscField label="Color Theme">
                <VscDropdown defaultValue="Dark+ (default dark)">
                  <VscOption text="Dark+ (default dark)">
                    Dark+ (default dark)
                  </VscOption>
                  <VscOption text="Light+ (default light)">
                    Light+ (default light)
                  </VscOption>
                  <VscOption text="Monokai">Monokai</VscOption>
                  <VscOption text="Solarized Dark">Solarized Dark</VscOption>
                </VscDropdown>
              </VscField>

              <VscCheckbox label="Minimap: Enabled" defaultChecked />
              <VscCheckbox label="Breadcrumbs: Enabled" defaultChecked />
              <VscCheckbox label="Sticky Scroll: Enabled" />
              <VscCheckbox label="Word Wrap" />
            </div>
          </div>
        </>
      )}

      {/* ── Terminal tab ───────────────────────────────────── */}
      {activeTab === 'terminal' && (
        <div style={sectionStyle}>
          <div style={sectionHeadingStyle}>Terminal</div>
          <div style={fieldGroupStyle}>
            <VscField
              label="Default Shell"
              tooltipContent="The default shell to use in the integrated terminal."
            >
              <VscDropdown defaultValue="/bin/zsh">
                <VscOption text="/bin/zsh">/bin/zsh</VscOption>
                <VscOption text="/bin/bash">/bin/bash</VscOption>
                <VscOption text="/usr/local/bin/fish">
                  /usr/local/bin/fish
                </VscOption>
              </VscDropdown>
            </VscField>

            <VscField label="Font Size">
              <VscInput
                type="number"
                defaultValue="13"
                style={{ width: 100 }}
              />
            </VscField>

            <VscField label="Shell Arguments">
              <VscTextarea defaultValue="--login" rows={2} />
            </VscField>

            <VscCheckbox label="Copy on Selection" />
            <VscCheckbox label="Cursor Blinking" defaultChecked />
          </div>
        </div>
      )}

      {/* ── Files tab ──────────────────────────────────────── */}
      {activeTab === 'files' && (
        <div style={sectionStyle}>
          <div style={sectionHeadingStyle}>File Management</div>
          <div style={fieldGroupStyle}>
            <VscField label="Auto Save">
              <VscDropdown defaultValue="afterDelay">
                <VscOption text="off">off</VscOption>
                <VscOption text="afterDelay">afterDelay</VscOption>
                <VscOption text="onFocusChange">onFocusChange</VscOption>
                <VscOption text="onWindowChange">onWindowChange</VscOption>
              </VscDropdown>
            </VscField>

            <VscField
              label="Auto Save Delay (ms)"
              tooltipContent="Controls the delay in milliseconds after which a dirty file is auto saved."
            >
              <VscInput
                type="number"
                defaultValue="1000"
                style={{ width: 120 }}
              />
            </VscField>

            <VscField
              label="Exclude Patterns"
              tooltipContent="Glob patterns for files and folders to exclude."
            >
              <VscTextarea
                defaultValue={'**/.git\n**/node_modules\n**/.DS_Store'}
                rows={3}
              />
            </VscField>

            <VscCheckbox label="Enable Trash" defaultChecked />
            <VscCheckbox label="Trim Trailing Whitespace" defaultChecked />
            <VscCheckbox label="Insert Final Newline" defaultChecked />
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────── */}
      <div style={footerStyle}>
        <VscButton appearance="subtle" icon={<ArrowResetRegular />}>
          Reset
        </VscButton>
        <VscButton appearance="primary" icon={<SaveRegular />}>
          Save
        </VscButton>
      </div>
    </div>
  );
}
