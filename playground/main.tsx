import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import {
  AddRegular,
  ChevronDownRegular,
  CircleRegular,
  EyeOffRegular,
  EyeRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';

import {
  VscButton,
  VscMenuButton,
  VscSplitButton,
  VscInput,
  VscTextarea,
  VscField,
  VscSearchBox,
  VscDropdown,
  VscListbox,
  VscOption,
  VscOptionGroup,
  VscOptionSeparator,
  VscMenuList,
  VscMenuItem,
  VscMenuItemCheckbox,
  VscMenuItemRadio,
  VscMenuDivider,
  VscMenuGroup,
  VscMenuGroupHeader,
  VscTabList,
  VscTab,
  VscCheckbox,
  VscLabel,
  VscBadge,
  VscSwitch,
  VscSlider,
  VscDialog,
  VscDialogTrigger,
  VscDialogSurface,
  VscDialogBody,
  VscDialogTitle,
  VscDialogDescription,
  VscDialogSeparator,
  VscDialogContent,
  VscDialogActions,
  VscAccordion,
  VscDivider,
  VscTag,
  VscBreadcrumb,
  VscBreadcrumbItem,
  VscBreadcrumbButton,
  VscBreadcrumbDivider,
  VscPopover,
  VscPopoverTrigger,
  VscPopoverSurface,
} from '../src';
import type { VscInputValidationState, VscValidationState } from '../src';

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '16px 0',
  borderBottom: '1px solid var(--vscode-widget-border)',
};

const headerStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--vscode-descriptionForeground)',
};

const gridHeadStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--vscode-descriptionForeground)',
};

const helperNoteStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  color: 'var(--vscode-descriptionForeground)',
};

function Matrix({
  rows,
  columns,
  rowLabelWidth = 140,
  columnWidthMode = 'fill',
  rowGap,
  columnGap,
  cellRender,
}: {
  rows: { key: string; label: string }[];
  columns: { key: string; label: string; className?: string }[];
  rowLabelWidth?: number;
  columnWidthMode?: 'fill' | 'content';
  rowGap?: number;
  columnGap?: number;
  cellRender: (rowKey: string, columnKey: string) => React.ReactNode;
}) {
  const columnTemplate =
    columnWidthMode === 'content'
      ? `${rowLabelWidth}px repeat(${columns.length}, max-content)`
      : `${rowLabelWidth}px repeat(${columns.length}, 1fr)`;

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columnTemplate,
    columnGap: columnGap ?? 12,
    rowGap: rowGap ?? 12,
    alignItems: 'center',
  };
  return (
    <div style={gridStyle}>
      <span />
      {columns.map((c) => (
        <span key={c.key} style={gridHeadStyle}>
          {c.label}
        </span>
      ))}
      {rows.map((r) => (
        <React.Fragment key={r.key}>
          <span style={gridHeadStyle}>{r.label}</span>
          {columns.map((c) => (
            <div
              key={c.key}
              className={['vsc-matrix-cell', c.className]
                .filter(Boolean)
                .join(' ')}
              style={{ display: 'inline-flex', width: 'max-content' }}
            >
              {cellRender(r.key, c.key)}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// Size × State combinations for buttons (text & icon variants)
const BUTTON_STATE_COLUMNS = [
  'default',
  'hover',
  'selected',
  'disabled',
] as const;
const BUTTON_SIZE_LABELS = ['Large', 'Small', 'Compact'] as const;
const BUTTON_COMBINED_COLUMNS = BUTTON_SIZE_LABELS.flatMap((sizeLabel) =>
  BUTTON_STATE_COLUMNS.map((state) => ({
    key: `${sizeLabel.toLowerCase()}-${state}`,
    label: `${sizeLabel} ${state.charAt(0).toUpperCase() + state.slice(1)}`,
    className: state === 'hover' ? 'vsc-force-hover' : undefined,
  })),
);

// Size × State combinations for icon-only buttons
const ICON_ONLY_STATE_COLUMNS = [
  'default',
  'hover',
  'selected',
  'disabled',
] as const;
const ICON_ONLY_COMBINED_COLUMNS = BUTTON_SIZE_LABELS.flatMap((sizeLabel) =>
  ICON_ONLY_STATE_COLUMNS.map((state) => ({
    key: `icon-${sizeLabel.toLowerCase()}-${state}`,
    label: `Icon ${sizeLabel} ${state.charAt(0).toUpperCase() + state.slice(1)}`,
    className: state === 'hover' ? 'vsc-force-hover' : undefined,
  })),
);

// Size × State for split buttons
const SPLIT_STATE_COLUMNS = [
  'default',
  'hover',
  'selected-left',
  'selected-right',
  'disabled',
] as const;
const SPLIT_COMBINED_COLUMNS = BUTTON_SIZE_LABELS.flatMap((sizeLabel) =>
  SPLIT_STATE_COLUMNS.map((state) => ({
    key: `${sizeLabel.toLowerCase()}-${state}`,
    label: `${sizeLabel} ${
      state === 'selected-left'
        ? 'Selected L'
        : state === 'selected-right'
          ? 'Selected R'
          : state.charAt(0).toUpperCase() + state.slice(1)
    }`,
    className: state === 'hover' ? 'vsc-force-hover' : undefined,
  })),
);

const FORM_STATE_COLUMNS_NO_SELECTED = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover', className: 'vsc-force-hover' },
  { key: 'focus', label: 'Focus', className: 'vsc-force-focus' },
  { key: 'readonly', label: 'Readonly' },
  { key: 'disabled', label: 'Disabled' },
];

const SEARCHBOX_STATE_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover', className: 'vsc-force-hover' },
  { key: 'focus', label: 'Focus', className: 'vsc-force-focus' },
  { key: 'disabled', label: 'Disabled' },
];

const INPUT_TEXTAREA_VALIDATION_ROWS = [
  { key: 'none', label: 'None' },
  { key: 'error', label: 'Error' },
  { key: 'warning', label: 'Warning' },
];

const FIELD_VALIDATION_ROWS = [
  { key: 'none', label: 'None' },
  { key: 'error', label: 'Error' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
];

const CHECKBOX_STATE_ROWS = [
  { key: 'unchecked', label: 'Unchecked' },
  { key: 'checked', label: 'Checked' },
  { key: 'mixed', label: 'Mixed' },
];

const CHECKBOX_SIZE_ROWS = [
  { key: 'large', label: 'Large' },
  { key: 'medium', label: 'Medium' },
  { key: 'small', label: 'Small' },
];

const CHECKBOX_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover', className: 'vsc-force-hover' },
  { key: 'focus', label: 'Focus', className: 'vsc-force-focus' },
  { key: 'disabled', label: 'Disabled' },
];

const SWITCH_STATE_ROWS = [
  { key: 'unchecked', label: 'Unchecked' },
  { key: 'checked', label: 'Checked' },
];

const SWITCH_LABEL_ROWS = [
  { key: 'none', label: 'No label' },
  { key: 'after', label: 'Label after' },
  { key: 'above', label: 'Label above' },
];

const SWITCH_COLUMNS = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover', className: 'vsc-force-hover' },
  { key: 'focus', label: 'Focus', className: 'vsc-force-focus' },
  { key: 'disabled', label: 'Disabled' },
];

const CONTROL_SIZE_ROWS = [
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
];

type Appearance = 'primary' | 'outline' | 'subtle' | 'transparent' | undefined;

function validationFor(rowKey: string): VscValidationState | undefined {
  return rowKey === 'none' ? undefined : (rowKey as VscValidationState);
}

function inputValidationFor(
  rowKey: string,
): VscInputValidationState | undefined {
  return rowKey === 'none' ? undefined : (rowKey as VscInputValidationState);
}

function ButtonSection() {
  const appearances: Appearance[] = [
    'primary',
    undefined,
    'outline',
    'subtle',
    'transparent',
  ];
  const appearanceLabels = [
    'Primary',
    'Secondary',
    'Outline',
    'Subtle',
    'Transparent',
  ];
  const appearanceRows = appearances.map((app, i) => ({
    key: app ?? 'secondary',
    label: appearanceLabels[i],
  }));

  const sizeStateMap = (
    col: string,
  ): { size: 'medium' | 'small' | 'compact'; state: string } => {
    const parts = col.split('-');
    const size =
      parts[0] === 'large' ? 'medium' : (parts[0] as 'small' | 'compact');
    const state = parts.slice(1).join('-');
    return { size, state };
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscButton (Appearance) × (Size × State)</h2>
      <Matrix
        rows={appearanceRows}
        columns={BUTTON_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscButton {...props}>Button</VscButton>;
        }}
      />

      <h3 style={headerStyle}>With Icons</h3>
      <Matrix
        rows={appearanceRows}
        columns={BUTTON_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscButton {...props}>Button</VscButton>;
        }}
      />

      <h3 style={headerStyle}>Icon-only (Appearance) × (Size × State)</h3>
      <Matrix
        rows={appearanceRows}
        columns={ICON_ONLY_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const parts = col.split('-');
          const size =
            parts[1] === 'large' ? 'medium' : (parts[1] as 'small' | 'compact');
          const state = parts.slice(2).join('-');
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
            'aria-label': row,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscButton {...props} />;
        }}
      />
    </section>
  );
}

function MenuButtonSection() {
  const appearances: Appearance[] = [
    'primary',
    undefined,
    'outline',
    'subtle',
    'transparent',
  ];
  const appearanceLabels = [
    'Primary',
    'Secondary',
    'Outline',
    'Subtle',
    'Transparent',
  ];
  const appearanceRows = appearances.map((app, i) => ({
    key: app ?? 'secondary',
    label: appearanceLabels[i],
  }));

  const sizeStateMap = (
    col: string,
  ): { size: 'medium' | 'small' | 'compact'; state: string } => {
    const parts = col.split('-');
    const size =
      parts[0] === 'large' ? 'medium' : (parts[0] as 'small' | 'compact');
    const state = parts.slice(1).join('-');
    return { size, state };
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscMenuButton (Appearance) × (Size × State)</h2>
      <Matrix
        rows={appearanceRows}
        columns={BUTTON_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscMenuButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscMenuButton {...props}>Menu</VscMenuButton>;
        }}
      />

      <h3 style={headerStyle}>With Icons</h3>
      <Matrix
        rows={appearanceRows}
        columns={BUTTON_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscMenuButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscMenuButton {...props}>Menu</VscMenuButton>;
        }}
      />

      <h3 style={headerStyle}>Icon-only (Appearance) × (Size × State)</h3>
      <Matrix
        rows={appearanceRows}
        columns={ICON_ONLY_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const parts = col.split('-');
          const size =
            parts[1] === 'large' ? 'medium' : (parts[1] as 'small' | 'compact');
          const state = parts.slice(2).join('-');
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscMenuButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
            menuIcon: <ChevronDownRegular />,
            'aria-label': row,
          };
          if (state === 'selected') props['aria-pressed'] = true;
          if (state === 'disabled') props.disabled = true;
          return <VscMenuButton {...props} />;
        }}
      />
    </section>
  );
}

function SplitButtonSection() {
  const appearances: Appearance[] = [
    'primary',
    undefined,
    'outline',
    'subtle',
    'transparent',
  ];
  const appearanceLabels = [
    'Primary',
    'Secondary',
    'Outline',
    'Subtle',
    'Transparent',
  ];
  const appearanceRows = appearances.map((app, i) => ({
    key: app ?? 'secondary',
    label: appearanceLabels[i],
  }));

  const sizeStateMap = (
    col: string,
  ): { size: 'medium' | 'small' | 'compact'; state: string } => {
    const parts = col.split('-');
    const size =
      parts[0] === 'large' ? 'medium' : (parts[0] as 'small' | 'compact');
    const state = parts.slice(1).join('-');
    return { size, state };
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscSplitButton (Appearance) × (Size × State)</h2>
      <Matrix
        rows={appearanceRows}
        columns={SPLIT_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscSplitButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
          };
          if (state === 'selected-left') {
            props.primaryActionButton = { 'aria-pressed': true };
          }
          if (state === 'selected-right') {
            props.menuButton = { 'aria-pressed': true };
          }
          if (state === 'disabled') props.disabled = true;
          return <VscSplitButton {...props}>Split</VscSplitButton>;
        }}
      />

      <h3 style={headerStyle}>With Icons</h3>
      <Matrix
        rows={appearanceRows}
        columns={SPLIT_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscSplitButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
          };
          if (state === 'selected-left') {
            props.primaryActionButton = { 'aria-pressed': true };
          }
          if (state === 'selected-right') {
            props.menuButton = { 'aria-pressed': true };
          }
          if (state === 'disabled') props.disabled = true;
          return <VscSplitButton {...props}>Split</VscSplitButton>;
        }}
      />

      <h3 style={headerStyle}>Icon-only (Appearance) × (Size × State)</h3>
      <Matrix
        rows={appearanceRows}
        columns={SPLIT_COMBINED_COLUMNS}
        columnWidthMode="content"
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const { size, state } = sizeStateMap(col);
          const appearance =
            row === 'secondary' ? undefined : (row as Appearance);
          const props: React.ComponentProps<typeof VscSplitButton> & {
            'data-appearance'?: string;
          } = {
            appearance,
            'data-appearance': appearance ?? 'secondary',
            size,
            icon: <AddRegular />,
            'aria-label': row,
          };
          if (state === 'selected-left') {
            props.primaryActionButton = { 'aria-pressed': true };
          }
          if (state === 'selected-right') {
            props.menuButton = { 'aria-pressed': true };
          }
          if (state === 'disabled') props.disabled = true;
          return <VscSplitButton {...props} />;
        }}
      />
    </section>
  );
}

function CheckboxSection() {
  const [controlledChecked, setControlledChecked] = useState(false);
  const [mixedChecked, setMixedChecked] = useState<'mixed' | boolean>('mixed');

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscCheckbox</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={headerStyle}>Direct Usage</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <VscCheckbox label="Unchecked" />
          <VscCheckbox label="Default checked" defaultChecked />
          <VscCheckbox
            label="Controlled"
            checked={controlledChecked}
            onChange={(_, data) => setControlledChecked(data.checked === true)}
          />
          <VscCheckbox
            label="Mixed"
            checked={mixedChecked}
            onChange={(_, data) => setMixedChecked(data.checked)}
          />
          <VscCheckbox label="Disabled" disabled />
          <VscCheckbox label="Disabled checked" disabled defaultChecked />
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <VscCheckbox size="small" label="Small" defaultChecked />
          <VscCheckbox label="Medium" defaultChecked />
          <VscCheckbox size="large" label="Large" defaultChecked />
          <VscCheckbox aria-label="Standalone" />
          <VscCheckbox aria-label="Standalone checked" defaultChecked />
        </div>
      </div>
      {CHECKBOX_SIZE_ROWS.map((sizeRow) => (
        <React.Fragment key={sizeRow.key}>
          <h3 style={headerStyle}>{sizeRow.label}</h3>
          <Matrix
            rows={CHECKBOX_STATE_ROWS}
            columns={CHECKBOX_COLUMNS}
            columnWidthMode="content"
            rowLabelWidth={100}
            rowGap={24}
            columnGap={28}
            cellRender={(row, col) => {
              const checked =
                row === 'checked'
                  ? true
                  : row === 'mixed'
                    ? ('mixed' as const)
                    : false;
              const size = sizeRow.key as 'small' | 'medium' | 'large';
              return (
                <VscCheckbox
                  label="Label"
                  size={size}
                  checked={checked}
                  disabled={col === 'disabled'}
                  onChange={() => {}}
                />
              );
            }}
          />
        </React.Fragment>
      ))}
    </section>
  );
}

function SwitchSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscSwitch</h2>
      {CHECKBOX_SIZE_ROWS.map((sizeRow) => (
        <React.Fragment key={sizeRow.key}>
          <h3 style={headerStyle}>{sizeRow.label}</h3>
          {SWITCH_STATE_ROWS.map((stateRow) => (
            <React.Fragment key={stateRow.key}>
              <Matrix
                rows={SWITCH_LABEL_ROWS}
                columns={SWITCH_COLUMNS}
                columnWidthMode="content"
                rowLabelWidth={120}
                rowGap={24}
                columnGap={28}
                cellRender={(row, col) => {
                  const checked = stateRow.key === 'checked';
                  const size = sizeRow.key as 'small' | 'medium' | 'large';
                  const labelPosition =
                    row === 'above' ? ('above' as const) : ('after' as const);
                  return (
                    <VscSwitch
                      label={row === 'none' ? undefined : 'Label'}
                      labelPosition={labelPosition}
                      size={size}
                      checked={checked}
                      disabled={col === 'disabled'}
                      onChange={() => {}}
                      autoFocus={col === 'focus'}
                    />
                  );
                }}
              />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </section>
  );
}

function SliderSection() {
  const sizes = ['small', 'medium'] as const;
  const columns = [
    { key: 'rest', label: 'Rest' },
    { key: 'focus', label: 'Focus', className: 'vsc-force-focus' },
    { key: 'disabled', label: 'Disabled' },
  ];
  const values: Record<string, number> = {
    rest: 70,
    focus: 70,
    disabled: 40,
  };
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscSlider</h2>
      {sizes.map((size) => (
        <Matrix
          key={size}
          rows={[{ key: size, label: size }]}
          columns={columns}
          columnWidthMode="content"
          rowLabelWidth={120}
          rowGap={24}
          columnGap={28}
          cellRender={(_row, col) => (
            <div style={{ width: 160 }}>
              <VscSlider
                size={size}
                defaultValue={values[col]}
                disabled={col === 'disabled'}
                aria-label={`${size} ${col}`}
              />
            </div>
          )}
        />
      ))}
    </section>
  );
}

function InputSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscInput</h2>
      <h3 style={headerStyle}>Sizes</h3>
      <Matrix
        rows={CONTROL_SIZE_ROWS}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        cellRender={(row, col) => (
          <VscInput
            placeholder="Input"
            size={row as 'small' | 'medium' | 'large'}
            readOnly={col === 'readonly'}
            disabled={col === 'disabled'}
          />
        )}
      />

      <h3 style={headerStyle}>Validation</h3>
      <Matrix
        rows={INPUT_TEXTAREA_VALIDATION_ROWS}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        cellRender={(row, col) => {
          const isInvalid = row === 'error' || row === 'warning';
          const isUnavailable =
            isInvalid && (col === 'readonly' || col === 'disabled');
          if (isUnavailable) {
            return <span style={gridHeadStyle}>-</span>;
          }

          return (
            <VscInput
              placeholder="Input"
              validationState={
                row === 'none' ? undefined : inputValidationFor(row)
              }
              readOnly={col === 'readonly'}
              disabled={col === 'disabled'}
            />
          );
        }}
      />
    </section>
  );
}

function TextareaSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscTextarea</h2>
      <Matrix
        rows={[{ key: 'default', label: 'Default' }]}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        cellRender={(_, col) => (
          <VscTextarea
            placeholder="Textarea"
            rows={2}
            readOnly={col === 'readonly'}
            disabled={col === 'disabled'}
          />
        )}
      />

      <h3 style={headerStyle}>Resize</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(['none', 'vertical', 'horizontal', 'both'] as const).map((mode) => (
          <div
            key={mode}
            style={{ display: 'flex', alignItems: 'start', gap: 12 }}
          >
            <span
              style={{
                ...gridHeadStyle,
                width: 140,
                flexShrink: 0,
                paddingTop: 6,
              }}
            >
              {mode}
            </span>
            <VscTextarea
              placeholder={`resize="${mode}"`}
              rows={2}
              resize={mode}
            />
          </div>
        ))}
      </div>

      <h3 style={headerStyle}>Validation</h3>
      <Matrix
        rows={INPUT_TEXTAREA_VALIDATION_ROWS}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        cellRender={(row, col) => {
          const isInvalid = row === 'error' || row === 'warning';
          const isUnavailable =
            isInvalid && (col === 'readonly' || col === 'disabled');
          if (isUnavailable) {
            return <span style={gridHeadStyle}>-</span>;
          }

          return (
            <VscTextarea
              placeholder="Textarea"
              rows={2}
              validationState={
                row === 'none' ? undefined : inputValidationFor(row)
              }
              readOnly={col === 'readonly'}
              disabled={col === 'disabled'}
            />
          );
        }}
      />
    </section>
  );
}

function SearchBoxSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscSearchBox</h2>

      <h3 style={headerStyle}>Outline Appearance</h3>
      <Matrix
        rows={[
          { key: 'small', label: 'Small' },
          { key: 'medium', label: 'Medium' },
          { key: 'large', label: 'Large' },
        ]}
        columns={SEARCHBOX_STATE_COLUMNS}
        rowLabelWidth={100}
        cellRender={(row, col) => (
          <VscSearchBox
            placeholder="Placeholder text"
            appearance="outline"
            size={row as 'small' | 'medium' | 'large'}
            disabled={col === 'disabled'}
            style={{ width: 220 }}
          />
        )}
      />

      <h3 style={headerStyle}>Transparent Appearance</h3>
      <Matrix
        rows={[
          { key: 'small', label: 'Small' },
          { key: 'medium', label: 'Medium' },
          { key: 'large', label: 'Large' },
        ]}
        columns={SEARCHBOX_STATE_COLUMNS}
        rowLabelWidth={100}
        cellRender={(row, col) => (
          <VscSearchBox
            placeholder="Placeholder text"
            appearance="transparent"
            size={row as 'small' | 'medium' | 'large'}
            disabled={col === 'disabled'}
            style={{ width: 220 }}
          />
        )}
      />
    </section>
  );
}

function MultiSelectListboxPreview({
  initiallySelected,
  disabled,
  focused,
}: {
  initiallySelected: string[];
  disabled: boolean;
  focused: boolean;
}) {
  const [selectedValues, setSelectedValues] =
    useState<string[]>(initiallySelected);

  return (
    <VscListbox
      style={{ minWidth: 220 }}
      multiselect
      selectionIndicator="checkmark"
      selectedOptions={selectedValues}
      onOptionSelect={(_, data) => {
        setSelectedValues(data.selectedOptions.map(String));
      }}
    >
      <VscOption
        value="a"
        data-active={focused ? 'true' : undefined}
        disabled={disabled}
      >
        Option A
      </VscOption>
      <VscOption value="b" disabled={disabled}>
        Option B
      </VscOption>
    </VscListbox>
  );
}

function TruncateDemo() {
  const [width, setWidth] = useState(160);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <label style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
          Width: {width}px
        </label>
        <input
          type="range"
          min={60}
          max={400}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ width, flexShrink: 0 }}>
          <p style={{ fontSize: 11, margin: '0 0 4px', opacity: 0.7 }}>
            truncate (default)
          </p>
          <VscDropdown value="A very long option label that should truncate">
            <VscOption value="long">
              A very long option label that should truncate
            </VscOption>
            <VscOption value="short">Short</VscOption>
          </VscDropdown>
        </div>
        <div
          style={{
            width: Math.max(80, Math.floor(width * 0.6)),
            flexShrink: 0,
          }}
        >
          <p style={{ fontSize: 11, margin: '0 0 4px', opacity: 0.7 }}>
            narrower
          </p>
          <VscDropdown
            size="small"
            value="Another long option label that should truncate"
          >
            <VscOption value="long">
              Another long option label that should truncate
            </VscOption>
            <VscOption value="short">Short</VscOption>
          </VscDropdown>
        </div>
      </div>
    </div>
  );
}

function DropdownSection() {
  const listboxRows = [
    { key: 'default', label: 'Default' },
    { key: 'secondary', label: 'Secondary text' },
    { key: 'description', label: 'Description' },
    { key: 'grouped', label: 'Grouped + separator' },
    { key: 'multiselect', label: 'Multi-select' },
  ];

  const listboxCols = [
    { key: 'default', label: 'Default' },
    { key: 'hover', label: 'Hover', className: 'vsc-force-hover' },
    { key: 'selected', label: 'Selected', className: 'vsc-force-selected' },
    { key: 'disabled', label: 'Disabled' },
  ];

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscDropdown</h2>
      <p style={helperNoteStyle}>
        Includes dropdown trigger states and the standalone dropdown
        listbox/option primitives.
      </p>
      <h3 style={headerStyle}>Sizes</h3>
      <Matrix
        rows={CONTROL_SIZE_ROWS}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        rowLabelWidth={100}
        cellRender={(row, col) => (
          <VscDropdown
            placeholder="Pick one"
            size={row as 'small' | 'medium' | 'large'}
            readOnly={col === 'readonly'}
            disabled={col === 'disabled'}
          >
            <VscOption value="one">One</VscOption>
            <VscOption value="two">Two</VscOption>
          </VscDropdown>
        )}
      />

      <h3 style={headerStyle}>Validation</h3>
      <Matrix
        rows={INPUT_TEXTAREA_VALIDATION_ROWS}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        rowLabelWidth={100}
        cellRender={(row, col) => {
          const isInvalid = row === 'error' || row === 'warning';
          const isUnavailable =
            isInvalid && (col === 'readonly' || col === 'disabled');
          if (isUnavailable) {
            return <span style={gridHeadStyle}>-</span>;
          }

          return (
            <VscDropdown
              placeholder="Pick one"
              validationState={row === 'none' ? undefined : validationFor(row)}
              readOnly={col === 'readonly'}
              disabled={col === 'disabled'}
            >
              <VscOption value="one">One</VscOption>
              <VscOption value="two">Two</VscOption>
            </VscDropdown>
          );
        }}
      />

      <h3 style={headerStyle}>Truncate (default: on)</h3>
      <p style={helperNoteStyle}>
        Drag the slider to change container width and see how the dropdown text
        truncates with ellipsis.
      </p>
      <TruncateDemo />

      <h3 style={headerStyle}>VscListbox / VscOption</h3>
      <Matrix
        rows={listboxRows}
        columns={listboxCols}
        rowLabelWidth={140}
        columnWidthMode="content"
        cellRender={(row, col) => {
          const disabled = col === 'disabled';
          const focused = col === 'hover';
          const selected = col === 'selected';

          if (row === 'grouped') {
            return (
              <VscListbox style={{ minWidth: 220 }}>
                <VscOptionGroup label="Group A">
                  <VscOption data-active={focused ? 'true' : undefined}>
                    Alpha
                  </VscOption>
                  <VscOption>Beta</VscOption>
                </VscOptionGroup>
                <VscOptionSeparator />
                <VscOptionGroup label="Group B">
                  <VscOption disabled={disabled}>Gamma</VscOption>
                </VscOptionGroup>
              </VscListbox>
            );
          }

          if (row === 'multiselect') {
            return (
              <MultiSelectListboxPreview
                initiallySelected={selected ? ['a'] : []}
                disabled={disabled}
                focused={focused}
              />
            );
          }

          return (
            <VscListbox
              selectedOptions={selected ? ['command-palette'] : []}
              style={{ minWidth: 220 }}
            >
              <VscOption
                value="command-palette"
                disabled={disabled}
                data-active={focused ? 'true' : undefined}
                secondaryText={row === 'secondary' ? '⌘K' : undefined}
                description={
                  row === 'description'
                    ? 'Additional details shown below.'
                    : undefined
                }
              >
                Open command palette
              </VscOption>
            </VscListbox>
          );
        }}
      />
    </section>
  );
}

function FieldSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscField</h2>
      <Matrix
        rows={FIELD_VALIDATION_ROWS}
        rowLabelWidth={100}
        columns={FORM_STATE_COLUMNS_NO_SELECTED}
        cellRender={(row, col) => {
          const isUnavailable =
            row !== 'none' && (col === 'readonly' || col === 'disabled');

          if (isUnavailable) {
            return <span style={gridHeadStyle}>-</span>;
          }

          return (
            <VscField
              label="Label"
              hint={row === 'none' ? 'A short hint' : undefined}
              validationState={validationFor(row)}
              validationMessage={row === 'none' ? undefined : `${row} message`}
            >
              <VscInput
                placeholder="With field"
                readOnly={col === 'readonly'}
                disabled={col === 'disabled'}
                validationState={
                  col === 'readonly'
                    ? undefined
                    : row === 'error' || row === 'warning'
                      ? inputValidationFor(row)
                      : undefined
                }
              />
            </VscField>
          );
        }}
      />
    </section>
  );
}

function MenuSection() {
  const itemRows = [
    { key: 'default', label: 'Default' },
    { key: 'accent', label: 'Accent' },
    { key: 'checkbox', label: 'Checkbox' },
    { key: 'radio', label: 'Radio' },
    { key: 'multiselect', label: 'Multi-select' },
    { key: 'submenu', label: 'Submenu' },
    { key: 'secondary', label: 'Secondary Text' },
    { key: 'grouped', label: 'Grouped' },
  ];
  const itemCols = [
    { key: 'default', label: 'Default' },
    { key: 'hover', label: 'Hover' },
    { key: 'selected', label: 'Selected' },
    { key: 'disabled', label: 'Disabled' },
  ];
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscMenuList / VscMenuItem</h2>
      <p style={helperNoteStyle}>
        Context menu primitives only. Dropdown options are shown in the
        VscDropdown section.
      </p>
      <Matrix
        rows={itemRows}
        columns={itemCols}
        cellRender={(row, col) => {
          const disabled = col === 'disabled';
          const focused = col === 'hover' || col === 'selected';
          if (row === 'checkbox') {
            return (
              <VscMenuList style={{ minWidth: 160 }}>
                <VscMenuItemCheckbox
                  name="demo"
                  value="x"
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  aria-checked={col === 'selected' ? true : undefined}
                >
                  Checkbox
                </VscMenuItemCheckbox>
              </VscMenuList>
            );
          }

          if (row === 'radio') {
            return (
              <VscMenuList style={{ minWidth: 180 }}>
                <VscMenuItemRadio
                  name="demo-radio"
                  value="option-a"
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  aria-checked={col === 'selected' ? true : undefined}
                >
                  Radio option
                </VscMenuItemRadio>
              </VscMenuList>
            );
          }

          if (row === 'multiselect') {
            return (
              <VscMenuList style={{ minWidth: 180 }}>
                <VscMenuItemCheckbox
                  name="multi"
                  value="alpha"
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  aria-checked={col === 'selected' ? true : undefined}
                >
                  Alpha
                </VscMenuItemCheckbox>
                <VscMenuItemCheckbox
                  name="multi"
                  value="beta"
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  aria-checked={col === 'selected' ? true : undefined}
                >
                  Beta
                </VscMenuItemCheckbox>
              </VscMenuList>
            );
          }

          if (row === 'submenu') {
            return (
              <VscMenuList style={{ minWidth: 180 }}>
                <VscMenuItem
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  hasSubmenu
                >
                  More options
                </VscMenuItem>
              </VscMenuList>
            );
          }

          if (row === 'secondary') {
            return (
              <VscMenuList style={{ minWidth: 180 }}>
                <VscMenuItem
                  disabled={disabled}
                  data-focused={focused ? 'true' : undefined}
                  secondaryContent="⌘K"
                >
                  Command
                </VscMenuItem>
              </VscMenuList>
            );
          }

          if (row === 'grouped') {
            return (
              <VscMenuList style={{ minWidth: 180 }}>
                <VscMenuGroupHeader>Group A</VscMenuGroupHeader>
                <VscMenuGroup>
                  <VscMenuItem
                    disabled={disabled}
                    data-focused={focused ? 'true' : undefined}
                  >
                    Group item
                  </VscMenuItem>
                </VscMenuGroup>
                <VscMenuDivider />
                <VscMenuGroupHeader>Group B</VscMenuGroupHeader>
                <VscMenuGroup>
                  <VscMenuItem
                    disabled={disabled}
                    data-focused={focused ? 'true' : undefined}
                  >
                    Another item
                  </VscMenuItem>
                </VscMenuGroup>
              </VscMenuList>
            );
          }

          return (
            <VscMenuList style={{ minWidth: 160 }}>
              <VscMenuItem
                accent={row === 'accent'}
                disabled={disabled}
                data-focused={focused ? 'true' : undefined}
              >
                {row === 'accent' ? 'Accent item' : 'Menu item'}
              </VscMenuItem>
            </VscMenuList>
          );
        }}
      />
    </section>
  );
}

const LABEL_COLUMNS = [
  { key: 'regular', label: 'Regular' },
  { key: 'semibold', label: 'Semibold' },
  { key: 'required', label: 'Required' },
  { key: 'required-info', label: 'Required + Info' },
];

function LabelSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscLabel</h2>
      <h3 style={headerStyle}>Enabled</h3>
      <Matrix
        rows={CONTROL_SIZE_ROWS}
        columns={LABEL_COLUMNS}
        columnWidthMode="content"
        cellRender={(row, col) => {
          const size = row as 'small' | 'medium' | 'large';
          const weight =
            col === 'semibold' || col === 'required-info'
              ? 'semibold'
              : 'regular';
          const required = col === 'required' || col === 'required-info';
          const tooltipContent =
            col === 'required-info' ? 'Help text' : undefined;
          return (
            <VscLabel
              size={size}
              weight={weight}
              required={required}
              tooltipContent={tooltipContent}
            >
              Label
            </VscLabel>
          );
        }}
      />
      <h3 style={headerStyle}>Disabled</h3>
      <Matrix
        rows={CONTROL_SIZE_ROWS}
        columns={LABEL_COLUMNS}
        columnWidthMode="content"
        cellRender={(row, col) => {
          const size = row as 'small' | 'medium' | 'large';
          const weight =
            col === 'semibold' || col === 'required-info'
              ? 'semibold'
              : 'regular';
          const required = col === 'required' || col === 'required-info';
          const tooltipContent =
            col === 'required-info' ? 'Help text' : undefined;
          return (
            <VscLabel
              size={size}
              weight={weight}
              disabled
              required={required}
              tooltipContent={tooltipContent}
            >
              Label
            </VscLabel>
          );
        }}
      />
    </section>
  );
}

const BADGE_APPEARANCE_COLUMNS = [
  { key: 'filled', label: 'Filled' },
  { key: 'tint', label: 'Tint' },
  { key: 'outline', label: 'Outline' },
  { key: 'subtle', label: 'Subtle' },
];

const BADGE_SIZE_ROWS = [
  { key: 'large', label: 'Large' },
  { key: 'medium', label: 'Medium' },
  { key: 'small', label: 'Small' },
];

const BADGE_COLOR_ROWS = [
  { key: 'blue', label: 'Blue' },
  { key: 'red', label: 'Red' },
  { key: 'yellow', label: 'Yellow' },
  { key: 'green', label: 'Green' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'neutralContrast', label: 'Neutral contrast' },
];

function BadgeSection() {
  const badgeIcon = <CircleRegular />;

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscBadge</h2>

      {BADGE_COLOR_ROWS.map((colorRow) => (
        <React.Fragment key={colorRow.key}>
          <h3 style={headerStyle}>{colorRow.label}</h3>
          <Matrix
            rows={BADGE_SIZE_ROWS}
            columns={BADGE_APPEARANCE_COLUMNS}
            columnWidthMode="content"
            rowLabelWidth={80}
            cellRender={(sizeKey, appearanceKey) => (
              <VscBadge
                color={
                  colorRow.key as React.ComponentProps<typeof VscBadge>['color']
                }
                appearance={
                  appearanceKey as React.ComponentProps<
                    typeof VscBadge
                  >['appearance']
                }
                size={sizeKey as React.ComponentProps<typeof VscBadge>['size']}
                icon={badgeIcon}
              >
                Badge
              </VscBadge>
            )}
          />
        </React.Fragment>
      ))}
    </section>
  );
}

const dialogLinkStyle: React.CSSProperties = {
  color: 'var(--vscode-textLink-foreground)',
  textDecoration: 'none',
};

const dialogFieldStackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const dialogRadioGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  border: 'none',
  padding: 0,
  margin: 0,
};

const dialogRadioLabelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 13,
  color: 'var(--vscode-foreground)',
  cursor: 'pointer',
};

const dialogRadioInputStyle: React.CSSProperties = {
  accentColor: 'var(--vscode-button-background)',
  width: 16,
  height: 16,
  margin: 0,
};

const dialogRevealButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'var(--vscode-icon-foreground)',
  cursor: 'pointer',
  lineHeight: 0,
};

function CredentialValueInput() {
  const [visible, setVisible] = useState(false);

  return (
    <VscInput
      type={visible ? 'text' : 'password'}
      placeholder="Value"
      withIcon
      contentAfter={
        <button
          type="button"
          style={dialogRevealButtonStyle}
          aria-label={visible ? 'Hide value' : 'Show value'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOffRegular fontSize={16} />
          ) : (
            <EyeRegular fontSize={16} />
          )}
        </button>
      }
    />
  );
}

function McpToolFormFields({ radioName }: { radioName: string }) {
  return (
    <>
      <VscDialogDescription>
        You are connecting to a third-party service that is not run or provided
        by Microsoft. Your use of that service is subject to the terms between
        you and that service. By continuing, you agree to the terms of service.{' '}
        <a href="#" style={dialogLinkStyle} onClick={(e) => e.preventDefault()}>
          Learn more
        </a>
      </VscDialogDescription>

      <fieldset style={dialogRadioGroupStyle}>
        <legend
          style={{
            padding: 0,
            marginBottom: 8,
            fontSize: 13,
            fontWeight: 400,
            color: 'var(--vscode-descriptionForeground)',
          }}
        >
          How to add function tool
        </legend>
        <label style={dialogRadioLabelStyle}>
          <input
            type="radio"
            name={radioName}
            defaultChecked
            style={dialogRadioInputStyle}
          />
          By example
        </label>
        <label style={dialogRadioLabelStyle}>
          <input type="radio" name={radioName} style={dialogRadioInputStyle} />
          upload existing schema
        </label>
      </fieldset>

      <div style={dialogFieldStackStyle}>
        <VscField label="Label" required tooltipContent="Help text">
          <VscInput placeholder="Enter connection name" />
        </VscField>
        <VscField label="Label" required tooltipContent="Help text">
          <VscInput placeholder="https://your-mcp-server.com" />
        </VscField>
        <VscField label="Label" required tooltipContent="Help text">
          <VscDropdown placeholder="Key based" value="key-based">
            <VscOption value="key-based">Key based</VscOption>
            <VscOption value="oauth">OAuth</VscOption>
          </VscDropdown>
        </VscField>
        <div style={dialogFieldStackStyle}>
          <VscLabel required tooltipContent="Help text">
            Credentials
          </VscLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <VscInput placeholder="Key" />
            <span
              style={{
                color: 'var(--vscode-descriptionForeground)',
                fontSize: 13,
              }}
            >
              :
            </span>
            <CredentialValueInput />
          </div>
          <VscButton
            appearance="outline"
            icon={<AddRegular />}
            style={{ alignSelf: 'flex-start' }}
          >
            Add Credential
          </VscButton>
        </div>
      </div>
    </>
  );
}

function InstructionDialog({ size }: { size: 'wide' | 'narrow' }) {
  return (
    <VscDialog>
      <VscDialogTrigger>
        <VscButton>Open {size === 'wide' ? 'wide' : 'narrow'} dialog</VscButton>
      </VscDialogTrigger>
      <VscDialogSurface size={size}>
        <VscDialogBody>
          <VscDialogTitle>Main question or action</VscDialogTitle>
          <VscDialogContent>
            <VscDialogDescription>
              <p style={{ margin: 0, fontSize: 13, lineHeight: '18px' }}>
                Check our{' '}
                <a
                  href="#"
                  style={dialogLinkStyle}
                  onClick={(e) => e.preventDefault()}
                >
                  documentation
                </a>{' '}
                to learn how AI Toolkit improves the instruction for your AI
                agent.
              </p>
            </VscDialogDescription>
            <VscDialogSeparator />
            <VscTextarea
              rows={5}
              defaultValue="Make these instructions clearer and more actionable. Keep the original intent, remove ambiguity, and rewrite with concise steps, explicit constraints, and expected output format."
            />
          </VscDialogContent>
          <VscDialogActions size={size}>
            <VscButton appearance="primary">Action</VscButton>
            <VscButton>Action</VscButton>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>
  );
}

function McpToolDialog() {
  const radioName = React.useId();
  return (
    <VscDialog>
      <div style={{ display: 'inline-flex', width: 'fit-content' }}>
        <VscDialogTrigger>
          <VscButton>Open form dialog</VscButton>
        </VscDialogTrigger>
      </div>
      <VscDialogSurface size="wide">
        <VscDialogBody>
          <VscDialogTitle>Add Model Context Protocol tool</VscDialogTitle>
          <VscDialogContent>
            <McpToolFormFields radioName={radioName} />
          </VscDialogContent>
          <VscDialogActions size="wide">
            <VscButton appearance="primary">Action</VscButton>
            <VscButton>Action</VscButton>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>
  );
}

function DialogSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscDialog</h2>
      <p style={helperNoteStyle}>
        Instruction editor (wide and narrow) with optional description and
        separator, plus a wide form dialog with fields, radio options, dropdown,
        and credentials.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={gridHeadStyle}>Dialog (wide & narrow)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <InstructionDialog size="wide" />
            <InstructionDialog size="narrow" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={gridHeadStyle}>Dialog with form</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <McpToolDialog />
          </div>
        </div>
      </div>
    </section>
  );
}

function PopoverSection() {
  const renderExample = (appearance: 'default' | 'brand') => {
    const onBrand = appearance === 'brand';
    const mutedColor = onBrand
      ? 'var(--vscode-button-foreground)'
      : 'var(--vscode-descriptionForeground)';
    return (
      <VscPopover withArrow>
        <VscPopoverTrigger>
          <VscButton appearance={onBrand ? 'primary' : undefined}>
            Open popover
          </VscButton>
        </VscPopoverTrigger>
        <VscPopoverSurface appearance={appearance}>
          <div style={{ width: 280 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <strong style={{ fontSize: 13 }}>Your apps</strong>
              <button
                type="button"
                aria-label="Close"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  padding: 0,
                  border: 'none',
                  borderRadius: 4,
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  lineHeight: 0,
                }}
              >
                <CircleRegular />
              </button>
            </div>
            <div
              style={{
                height: 96,
                borderRadius: 4,
                marginBottom: 8,
                background: onBrand
                  ? 'rgba(0, 0, 0, 0.2)'
                  : 'var(--vscode-editorWidget-background)',
              }}
            />
            <p style={{ margin: '0 0 12px', fontSize: 12, color: mutedColor }}>
              Expand the App Launcher to see all of your Microsoft 365 apps.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 12, color: mutedColor }}>1 of 6</span>
              <VscButton appearance={onBrand ? undefined : 'primary'}>
                Next
              </VscButton>
            </div>
          </div>
        </VscPopoverSurface>
      </VscPopover>
    );
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscPopover</h2>
      <p style={helperNoteStyle}>
        Contextual overlay anchored to a trigger. Supports default (neutral) and
        brand (accent) appearances, each with an ambient + key drop shadow.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={gridHeadStyle}>Default</div>
          {renderExample('default')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={gridHeadStyle}>Brand</div>
          {renderExample('brand')}
        </div>
      </div>
    </section>
  );
}

function TabListSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscTabList</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <span style={gridHeadStyle}>Horizontal</span>
        <VscTabList defaultSelectedValue="selected">
          <VscTab value="default">Default</VscTab>
          <VscTab value="hover" className="vsc-force-hover">
            Hover
          </VscTab>
          <VscTab value="selected">Selected</VscTab>
          <VscTab value="disabled" disabled>
            Disabled
          </VscTab>
        </VscTabList>

        <span style={gridHeadStyle}>Small</span>
        <VscTabList defaultSelectedValue="selected" size="small">
          <VscTab value="default">Default</VscTab>
          <VscTab value="hover" className="vsc-force-hover">
            Hover
          </VscTab>
          <VscTab value="selected">Selected</VscTab>
          <VscTab value="disabled" disabled>
            Disabled
          </VscTab>
        </VscTabList>

        <span style={gridHeadStyle}>Vertical</span>
        <VscTabList defaultSelectedValue="selected" vertical>
          <VscTab value="default">Default</VscTab>
          <VscTab value="hover" className="vsc-force-hover">
            Hover
          </VscTab>
          <VscTab value="selected">Selected</VscTab>
          <VscTab value="disabled" disabled>
            Disabled
          </VscTab>
        </VscTabList>
      </div>
    </section>
  );
}

function DividerSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>Divider</h2>

      <div>
        <div style={gridHeadStyle}>Horizontal – Large</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 8,
          }}
        >
          <VscDivider alignContent="center" size="large">
            Text
          </VscDivider>
          <VscDivider alignContent="start" size="large">
            Text
          </VscDivider>
          <VscDivider alignContent="end" size="large">
            Text
          </VscDivider>
        </div>
      </div>

      <div>
        <div style={gridHeadStyle}>Horizontal – Small</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 8,
          }}
        >
          <VscDivider alignContent="center" size="small">
            Text
          </VscDivider>
          <VscDivider alignContent="start" size="small">
            Text
          </VscDivider>
          <VscDivider alignContent="end" size="small">
            Text
          </VscDivider>
        </div>
      </div>

      <div>
        <div style={gridHeadStyle}>Vertical – Large</div>
        <div style={{ display: 'flex', gap: 48, height: 200, marginTop: 8 }}>
          <VscDivider orientation="vertical" alignContent="start" size="large">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="center" size="large">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="end" size="large">
            Text
          </VscDivider>
        </div>
      </div>

      <div>
        <div style={gridHeadStyle}>Vertical – Small</div>
        <div style={{ display: 'flex', gap: 48, height: 200, marginTop: 8 }}>
          <VscDivider orientation="vertical" alignContent="start" size="small">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="center" size="small">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="end" size="small">
            Text
          </VscDivider>
        </div>
      </div>
    </section>
  );
}

function TagSection() {
  const tagIcon = <CircleRegular />;
  const sizes = ['large', 'medium', 'small'] as const;
  const appearances = ['default', 'outline', 'brand'] as const;

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>VscTag</h2>

      {/* 1-line tags */}
      <h3 style={headerStyle}>Single Line</h3>
      {appearances.map((appearance) => (
        <div
          key={appearance}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={gridHeadStyle}>{appearance}</span>
          {sizes.map((size) => (
            <VscTag
              key={size}
              appearance={appearance}
              size={size}
              icon={tagIcon}
            >
              Primary text
            </VscTag>
          ))}
          <VscTag appearance={appearance} size="large" icon={tagIcon} disabled>
            Primary text
          </VscTag>
        </div>
      ))}

      {/* 2-line tags – large only */}
      <h3 style={headerStyle}>With Secondary Text</h3>
      {appearances.map((appearance) => (
        <div
          key={appearance}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={gridHeadStyle}>{appearance}</span>
          <VscTag
            appearance={appearance}
            size="large"
            icon={tagIcon}
            secondaryText="Secondary"
          >
            Primary text
          </VscTag>
        </div>
      ))}
    </section>
  );
}

function BreadcrumbSection() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>Breadcrumb</h2>

      <div>
        <div style={gridHeadStyle}>Small</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginTop: 8,
          }}
        >
          <VscBreadcrumb size="small">
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small" current>
                Text
              </VscBreadcrumbButton>
            </VscBreadcrumbItem>
          </VscBreadcrumb>

          <VscBreadcrumb size="small">
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton
                size="small"
                icon={<MoreHorizontalRegular />}
              />
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="small" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="small" current>
                Text
              </VscBreadcrumbButton>
            </VscBreadcrumbItem>
          </VscBreadcrumb>
        </div>
      </div>

      <div>
        <div style={gridHeadStyle}>Medium</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginTop: 8,
          }}
        >
          <VscBreadcrumb size="medium">
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium" current>
                Text
              </VscBreadcrumbButton>
            </VscBreadcrumbItem>
          </VscBreadcrumb>

          <VscBreadcrumb size="medium">
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton
                size="medium"
                icon={<MoreHorizontalRegular />}
              />
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
            </VscBreadcrumbItem>
            <VscBreadcrumbDivider size="medium" />
            <VscBreadcrumbItem>
              <VscBreadcrumbButton size="medium" current>
                Text
              </VscBreadcrumbButton>
            </VscBreadcrumbItem>
          </VscBreadcrumb>
        </div>
      </div>

      <div>
        <div style={gridHeadStyle}>Breadcrumb Item States</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 8,
          }}
        >
          {(['small', 'medium'] as const).map((size) => (
            <React.Fragment key={size}>
              <div style={gridHeadStyle}>
                With Icon and Text – {size === 'small' ? 'Small' : 'Medium'}
              </div>
              <Matrix
                rows={[
                  { key: 'current', label: 'Current' },
                  { key: 'regular', label: 'Regular' },
                ]}
                columns={[
                  { key: 'default', label: 'Default' },
                  {
                    key: 'hover',
                    label: 'Hover',
                    className: 'vsc-force-hover',
                  },
                  {
                    key: 'focus',
                    label: 'Focus',
                    className: 'vsc-force-focus',
                  },
                  { key: 'disabled', label: 'Disabled' },
                ]}
                columnWidthMode="content"
                rowLabelWidth={100}
                cellRender={(row, col) => (
                  <span
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <VscBreadcrumbButton
                      size={size}
                      current={row === 'current'}
                      disabled={col === 'disabled'}
                      icon={<CircleRegular />}
                    >
                      Text
                    </VscBreadcrumbButton>
                    {row === 'regular' && <VscBreadcrumbDivider size={size} />}
                  </span>
                )}
              />

              <div style={gridHeadStyle}>
                Text Only – {size === 'small' ? 'Small' : 'Medium'}
              </div>
              <Matrix
                rows={[
                  { key: 'current', label: 'Current' },
                  { key: 'regular', label: 'Regular' },
                ]}
                columns={[
                  { key: 'default', label: 'Default' },
                  {
                    key: 'hover',
                    label: 'Hover',
                    className: 'vsc-force-hover',
                  },
                  {
                    key: 'focus',
                    label: 'Focus',
                    className: 'vsc-force-focus',
                  },
                  { key: 'disabled', label: 'Disabled' },
                ]}
                columnWidthMode="content"
                rowLabelWidth={100}
                cellRender={(row, col) => (
                  <span
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <VscBreadcrumbButton
                      size={size}
                      current={row === 'current'}
                      disabled={col === 'disabled'}
                    >
                      Text
                    </VscBreadcrumbButton>
                    {row === 'regular' && <VscBreadcrumbDivider size={size} />}
                  </span>
                )}
              />

              <div style={gridHeadStyle}>
                Icon Only – {size === 'small' ? 'Small' : 'Medium'}
              </div>
              <Matrix
                rows={[{ key: 'regular', label: 'Regular' }]}
                columns={[
                  { key: 'default', label: 'Default' },
                  {
                    key: 'hover',
                    label: 'Hover',
                    className: 'vsc-force-hover',
                  },
                  {
                    key: 'focus',
                    label: 'Focus',
                    className: 'vsc-force-focus',
                  },
                  { key: 'disabled', label: 'Disabled' },
                ]}
                columnWidthMode="content"
                rowLabelWidth={100}
                cellRender={(row, col) => (
                  <span
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <VscBreadcrumbButton
                      size={size}
                      disabled={col === 'disabled'}
                      icon={<MoreHorizontalRegular />}
                    />
                    {row === 'regular' && <VscBreadcrumbDivider size={size} />}
                  </span>
                )}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveHoverDemo() {
  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>
        Live Hover Demo (Interactive — Hover to Verify Real Behavior)
      </h2>
      <p
        style={{
          fontSize: 12,
          color: 'var(--vscode-descriptionForeground)',
          margin: '0 0 12px 0',
        }}
      >
        These components are interactive. Hover to verify real runtime behavior
        matches the matrix.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={gridHeadStyle}>Buttons with Icons</div>
          <div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}
          >
            <VscButton appearance="primary" icon={<AddRegular />}>
              Primary
            </VscButton>
            <VscButton icon={<AddRegular />}>Secondary</VscButton>
            <VscButton appearance="outline" icon={<AddRegular />}>
              Outline
            </VscButton>
            <VscButton appearance="subtle" icon={<AddRegular />}>
              Subtle
            </VscButton>
            <VscButton appearance="transparent" icon={<AddRegular />}>
              Transparent
            </VscButton>
          </div>
        </div>

        <div>
          <div style={gridHeadStyle}>Icon-Only Buttons</div>
          <div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}
          >
            <VscButton
              appearance="primary"
              icon={<AddRegular />}
              aria-label="Primary"
            />
            <VscButton icon={<AddRegular />} aria-label="Secondary" />
            <VscButton
              appearance="outline"
              icon={<AddRegular />}
              aria-label="Outline"
            />
            <VscButton
              appearance="subtle"
              icon={<AddRegular />}
              aria-label="Subtle"
            />
            <VscButton
              appearance="transparent"
              icon={<AddRegular />}
              aria-label="Transparent"
            />
          </div>
        </div>

        <div>
          <div style={gridHeadStyle}>Menu Buttons</div>
          <div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}
          >
            <VscMenuButton
              appearance="primary"
              menuIcon={<ChevronDownRegular />}
            >
              Primary
            </VscMenuButton>
            <VscMenuButton menuIcon={<ChevronDownRegular />}>
              Secondary
            </VscMenuButton>
            <VscMenuButton
              appearance="outline"
              menuIcon={<ChevronDownRegular />}
            >
              Outline
            </VscMenuButton>
            <VscMenuButton
              appearance="subtle"
              menuIcon={<ChevronDownRegular />}
            >
              Subtle
            </VscMenuButton>
            <VscMenuButton
              appearance="transparent"
              menuIcon={<ChevronDownRegular />}
            >
              Transparent
            </VscMenuButton>
          </div>
        </div>

        <div>
          <div style={gridHeadStyle}>Form Controls</div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexDirection: 'column',
              marginTop: 8,
              maxWidth: 300,
            }}
          >
            <VscInput placeholder="Hover over me" />
            <VscSearchBox placeholder="Search..." />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionSection() {
  const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

  const smallCircleIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );

  const largeCircleIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );

  const headerWithIcon = (size: (typeof sizes)[number]) => {
    const icon =
      size === 'large' || size === 'extra-large'
        ? largeCircleIcon
        : smallCircleIcon;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {icon} Text
      </span>
    );
  };

  const contentPlaceholder = (
    <div
      style={{
        marginTop: 4,
        padding: '6px 12px',
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#479EF5',
        backgroundColor: '#082338',
        borderRadius: 2,
        maxWidth: 200,
      }}
    >
      Swap with content component
    </div>
  );

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>Accordion</h2>

      {/* Icon Before */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={gridHeadStyle}>Icon Before</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 48,
          }}
        >
          <span style={gridHeadStyle}>Expanded</span>
          <span style={gridHeadStyle}>Collapsed</span>
          <span style={gridHeadStyle}>Disabled</span>
        </div>
        {sizes.map((size) => (
          <div
            key={`before-${size}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <VscAccordion size={size} header={headerWithIcon(size)} defaultOpen>
              {contentPlaceholder}
            </VscAccordion>
            <VscAccordion size={size} header={headerWithIcon(size)}>
              <div>Content</div>
            </VscAccordion>
            <VscAccordion size={size} header={headerWithIcon(size)} disabled>
              <div>Content</div>
            </VscAccordion>
          </div>
        ))}

        <div style={gridHeadStyle}>Icon After</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 48,
          }}
        >
          <span style={gridHeadStyle}>Expanded</span>
          <span style={gridHeadStyle}>Collapsed</span>
          <span style={gridHeadStyle}>Disabled</span>
        </div>
        {sizes.map((size) => (
          <div
            key={`after-${size}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <VscAccordion
              size={size}
              iconPosition="after"
              header={headerWithIcon(size)}
              defaultOpen
            >
              {contentPlaceholder}
            </VscAccordion>
            <VscAccordion
              size={size}
              iconPosition="after"
              header={headerWithIcon(size)}
            >
              <div>Content</div>
            </VscAccordion>
            <VscAccordion
              size={size}
              iconPosition="after"
              header={headerWithIcon(size)}
              disabled
            >
              <div>Content</div>
            </VscAccordion>
          </div>
        ))}
      </div>
    </section>
  );
}

function Playground() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  return (
    <FluentProvider theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--vscode-editor-background)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 32 }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 20 }}>
                vsc-ui-react playground
              </h1>
              <p
                style={{
                  margin: '4px 0 0',
                  color: 'var(--vscode-descriptionForeground)',
                  fontSize: 12,
                }}
              >
                State matrix for each component. Each row is a variant; each
                column is an interaction state (Hover / Focus / Selected /
                Disabled simulated statically).
              </p>
            </div>
            <div
              style={{ display: 'inline-flex', gap: 16, alignItems: 'center' }}
            >
              <label
                style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}
              >
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                />
                Dark Modern
              </label>
              <label
                style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}
              >
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                />
                Light Modern
              </label>
            </div>
          </header>

          <ButtonSection />
          <MenuButtonSection />
          <SplitButtonSection />
          <CheckboxSection />
          <SwitchSection />
          <SliderSection />
          <InputSection />
          <TextareaSection />
          <SearchBoxSection />
          <DropdownSection />
          <FieldSection />
          <LabelSection />
          <BadgeSection />
          <MenuSection />
          <TabListSection />
          <DialogSection />
          <PopoverSection />
          <AccordionSection />
          <DividerSection />
          <TagSection />
          <BreadcrumbSection />
          <LiveHoverDemo />
        </div>
      </div>
    </FluentProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
