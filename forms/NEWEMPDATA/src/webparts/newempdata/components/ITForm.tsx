import * as React from 'react';
import {
  Stack,
  TextField,
  Dropdown,
  PrimaryButton,
  IDropdownOption
} from '@fluentui/react';

const office365LicenseOptions: IDropdownOption[] = [
  { key: 'Office 365 E1 Plus', text: 'Office 365 E1 Plus' },
  { key: 'Teams Enterprise', text: 'Teams Enterprise' },
  { key: 'M365 F3', text: 'M365 F3' },
  { key: 'Power BI Pro Per User', text: 'Power BI Pro Per User' },
  { key: 'M365 E5 (no Teams) & w/o Audio Conf', text: 'M365 E5 (no Teams) & w/o Audio Conf' },
  { key: 'Exchange Services Archival & Litigation Hold', text: 'Exchange Services Archival & Litigation Hold' },
  { key: 'Microsoft Apps for Enterprise', text: 'Microsoft Apps for Enterprise' },
  { key: 'Defender for Office Plan 1', text: 'Defender for Office Plan 1' },
  { key: 'Defender EndPoint P1', text: 'Defender EndPoint P1' }
];

export default function ITForm({ data, onChange, onNext }: any) {
  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <h3>💻 IT Details</h3>

      <TextField
        label="Email ID"
        value={data.Email_ID || ''}
        onChange={(_, v) => onChange('Email_ID', v)}
      />

      <Dropdown
        label="Office 365 License"
        placeholder="Select license"
        options={office365LicenseOptions}
        selectedKey={data.Office_365_License}
        onChange={(_, o) => onChange('Office_365_License', o?.key)}
        styles={{
          dropdown: { width: '100%' } // FULL WIDTH
        }}
        required
      />

      <PrimaryButton text="Next" onClick={onNext} />
    </Stack>
  );
}
