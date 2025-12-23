import * as React from 'react';
import { Stack, TextField, DatePicker, PrimaryButton, Dropdown, IDropdownOption } from '@fluentui/react';


const departmentOptions: IDropdownOption[] = [
  { key: 'ENGINEERING', text: 'ENGINEERING' },
  { key: 'Flight operations', text: 'Flight operations' },
  { key: 'AIRPORT SERVICES', text: 'AIRPORT SERVICES' },
  { key: 'SECURITY', text: 'SECURITY' },
  { key: 'HUMAN RESOURCE', text: 'HUMAN RESOURCE' },
  { key: 'INFLIGHT SERVICES', text: 'INFLIGHT SERVICES' },
  { key: 'ADMINISTRATION', text: 'ADMINISTRATION' },
  { key: 'CALL CENTER', text: 'CALL CENTER' },
  { key: 'INFORMATION TECHNOLOGY', text: 'INFORMATION TECHNOLOGY' },
  { key: 'CEO OFFICE', text: 'CEO OFFICE' },
  { key: 'LEGAL', text: 'LEGAL' },
  { key: 'SALES', text: 'SALES' },
  { key: 'REVENUE MANAGEMENT', text: 'REVENUE MANAGEMENT' },
  { key: 'NETWORK PLANNING', text: 'NETWORK PLANNING' },
  { key: 'IOCC', text: 'IOCC' },
  { key: 'FLIGHT SAFETY', text: 'FLIGHT SAFETY' },
  { key: 'FINANCE', text: 'FINANCE' },
  { key: 'CUSTOMER RELATIONSHIP MANAGEMENT', text: 'CUSTOMER RELATIONSHIP MANAGEMENT' },
  { key: 'MARKETING', text: 'MARKETING' }
]



export default function HRForm({ data, onChange, onNext }: any) {
  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <h3>👤 HR Details</h3>

      <TextField label="First Name" value={data.First_Name} onChange={(_,v)=>onChange("First_Name",v)} />
      <TextField label="Last Name" value={data.Last_Name} onChange={(_,v)=>onChange("Last_Name",v)} />
      <DatePicker label="DOB" value={data.DOB} onSelectDate={(d)=>onChange("DOB",d)} />
      <TextField label="Phone_Number" value={data.Phone_Number} onChange={(_,v)=>onChange("Phone_Number",v)} />
      <TextField label="Location" value={data.Location } onChange={(_,v)=>onChange("Location",v)} />
      <Dropdown
        label="Department"
        selectedKey={data.Department}
        onChange={(_, option) => onChange("Department", option?.key)}
        placeholder="Select a department"
        options={departmentOptions}
      />

      <PrimaryButton text="Next" onClick={onNext} />
    </Stack>
  );
}
