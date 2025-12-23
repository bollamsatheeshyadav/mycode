import * as React from 'react';
import {
  Stack,
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  IDropdownStyles
} from '@fluentui/react';

// Yes / No options with icons
const yesNoOptions: IDropdownOption[] = [
  { key: 'Yes', text: '✔ Yes' },
  { key: 'No', text: '✖ No' }
];

// Full width dropdown + hover effect
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: '100%',              // FULL LENGTH
    backgroundColor: '#f7f9ff',
    borderRadius: 6,
    selectors: {
      ':hover': {
        backgroundColor: '#e6ecff'
      }
    }
  },
  title: {
    backgroundColor: 'inherit',
    fontWeight: 500
  }
};

export default function AdminForm({ data, onChange, onSubmit, saving }: any) {
  return (
    <Stack tokens={{ childrenGap: 14 }}>
      <h3>⚙️ Admin Details</h3>

      <Dropdown
        label="Desktop Configuration"
        selectedKey={data.Desktop_Configuration}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Desktop_Configuration', option?.key)
        }
      />

      <Dropdown
        label="Price for Device"
        selectedKey={data.Price_for_Device}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Price_for_Device', option?.key)
        }
      />

      <Dropdown
        label="Desk"
        selectedKey={data.Desk}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Desk', option?.key)
        }
      />

      <Dropdown
        label="APT"
        selectedKey={data.APT}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('APT', option?.key)
        }
      />

      <Dropdown
        label="Uniform"
        selectedKey={data.Uniform}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Uniform', option?.key)
        }
      />

      <Dropdown
        label="Mobile"
        selectedKey={data.Mobile}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Mobile', option?.key)
        }
      />

      <Dropdown
        label="SIM"
        selectedKey={data.Sim}
        options={yesNoOptions}
        styles={dropdownStyles}
        onChange={(_, option) =>
          onChange('Sim', option?.key)
        }
      />

      <PrimaryButton
        text={saving ? 'Saving...' : 'Submit'}
        disabled={saving}
        onClick={onSubmit}
      />
    </Stack>
  );
}
