import * as React from 'react';
import {
  TextField, Panel, PanelType,
  Dropdown,
  IDropdownOption,
  DatePicker,
  PrimaryButton,
  Stack} from '@fluentui/react';
 
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { SPHttpClient } from '@microsoft/sp-http';
 
 
export default function StaffOnLeaveForm(props: { context: any }) {
 
  const sp = spfi().using(SPFx(props.context));
 
  const [showForm, setShowForm] = React.useState(false);
 
  const [formData, setFormData] = React.useState({
    NameofEmployee: '',
    StarEmployeeID: '',
    Department: '',
    PurposeofVisit: '',
    Date: undefined as Date | undefined,
    PaxName: '',
    Source: '',
    Destination: '',
    RelationshipwithEmployee: ''
  });
 
 
 
  // Get logged-in user details
React.useEffect(() => {
  props.context.spHttpClient
    .get(
      `${props.context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
      SPHttpClient.configurations.v1
    )
    .then((res: { json: () => any; }) => res.json())
    .then((data: { UserProfileProperties: { find: (arg0: (p: any) => boolean) => any; }; }) => {
      const departmentProp = data.UserProfileProperties
        ?.find((p: any) => p.Key === 'Department');
 
      setFormData(prev => ({
        ...prev,
        NameofEmployee: props.context.pageContext.user.displayName,
        Department: departmentProp?.Value || ''
      }));
    })
    .catch(console.error);
}, []);
const createInitialRows = () => {
  const arr: { paxName: string; relationship: string }[] = [];
  for (let i = 0; i < 6; i++) {
    arr.push({
      paxName: '',
      relationship: ''
    });
  }
  return arr;
};
 
 
const [rows, setRows] = React.useState(createInitialRows());
const resetForm = () => {
  setFormData({
    NameofEmployee: props.context.pageContext.user.displayName,
    StarEmployeeID: '',
    Department: '',
    PurposeofVisit: '',
    Date: undefined,
    PaxName: '', // <-- add this
    Source: '',
    Destination: '',
    RelationshipwithEmployee: ''
  });
  setRows(createInitialRows());
};
 
 
const updateRow = (index: number, field: 'paxName' | 'relationship', value: string) => {
  const updated = [...rows];
  updated[index][field] = value;
  setRows(updated);
};
 
  const locationOptions: IDropdownOption[] = [
    'Belgum','Ahmedabad','Yapathi','BiAI','Hindon','Kalabugai',
    'Surat','Nagpur','Pune','Kolhap','Toon','Junhin',
    'Lucknow','Training Centre','BiAH','BiHo Ground How','HAL','Bangalore'
  ].map(loc => ({ key: loc, text: loc }));
 
  // 🔐 Validation
 const isValid = () => {
  // Check main form fields
  const mainFieldsValid =
    formData.StarEmployeeID &&
    formData.PurposeofVisit &&
    formData.Date &&
    formData.Source &&
    formData.Destination;
 
  // Check rows: at least one row should have paxName or relationship filled
  const atLeastOneRowFilled = rows.some(
    (row) => row.paxName.trim() !== '' || row.relationship.trim() !== ''
  );
 
  return mainFieldsValid && atLeastOneRowFilled;
};
 
 
 
 const submitForm = async () => {
  if (!isValid()) {
    alert('Please fill all required fields and at least one row in the table');
    return;
  }
 
  try {
    await sp.web.lists.getByTitle('Staff On Leave').items.add({
      NameofEmployee: formData.NameofEmployee,
      StarEmployeeID: formData.StarEmployeeID,
      Department: formData.Department,
      PurposeofVisit: formData.PurposeofVisit,
      Date: formData.Date,
      Source: formData.Source,
      Destination: formData.Destination,
     
      PaxName: rows[0]?.paxName || '',
      PaxName2: rows[1]?.paxName || '',
      PaxName3: rows[2]?.paxName || '',
      PaxName4: rows[3]?.paxName || '',
      PaxName5: rows[4]?.paxName || '',
      PaxName6: rows[5]?.paxName || '',
 
      RelationshipwithEmployee: rows[0]?.relationship || '',
      RelationshipwithEmployee2: rows[1]?.relationship || '',
      RelationshipwithEmployee3: rows[2]?.relationship || '',
      RelationshipwithEmployee4: rows[3]?.relationship || '',
      RelationshipwithEmployee5: rows[4]?.relationship || '',
      RelationshipwithEmployee6: rows[5]?.relationship || ''
    });
 
    alert('Form submitted successfully');
    setShowForm(false);
  } catch (error) {
    console.error(error);
    alert('Error submitting form');
  }
};
 
 
 
 return (
  <div style={{ padding: 12 }}>
 
   <Stack horizontalAlign="center">
  <PrimaryButton
    text="SOL"
    onClick={() => {
      resetForm();  // resets form
      setShowForm(true); // opens panel
    }}
    styles={{
      root: {
        backgroundColor: '#003366',
        borderRadius: 15,
        padding: '10px 36px',
        fontSize: 14
      }
    }}
  />
</Stack>
 
 <Panel
  isOpen={showForm}
  onDismiss={() => setShowForm(false)}
  isLightDismiss
  type={PanelType.custom}
  customWidth="850px"
  hasCloseButton={false}
  styles={{
    main: {
      left: '50% !important',
      transform: 'translateX(-50%) !important',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#D3D3FF'
    },
    navigation: {
      height: 0,
      padding: 0
    },
    content: {
      padding: 0,
      backgroundColor: '#D3D3FF'
    },
    scrollableContent: {
      padding: 0,
      backgroundColor: '#D3D3FF'
    }
  }}
>
 
 
<div
  style={{
    backgroundColor: '#005a9e',
    color: '#ffffff',
    padding: '14px 20px',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <span>Staff On Leave</span>
 
  <span
    style={{ cursor: 'pointer', fontSize: 18 }}
    onClick={() => setShowForm(false)}
  >
    ✕
  </span>
</div>
 
 
 
      {/* Body */}
      <div style={{ padding: 16 }}>
        <Stack tokens={{ childrenGap: 10 }}>
 
          <TextField
            label="Name of Employee"
            value={formData.NameofEmployee}
            disabled
            styles={{ fieldGroup: { borderRadius: 8 } }}
          />
 
          <TextField
            label="Star Employee ID"
            required
            value={formData.StarEmployeeID}
            onChange={(_, v) =>
              setFormData({ ...formData, StarEmployeeID: v || '' })
            }
            styles={{ fieldGroup: { borderRadius: 8 } }}
          />
 
          <TextField
            label="Department"
            required
            value={formData.Department}
            disabled
            styles={{ fieldGroup: { borderRadius: 8 } }}
          />
 
          <TextField
            label="Purpose of Visit"
            required
            multiline
            rows={3}
            value={formData.PurposeofVisit}
            onChange={(_, v) =>
              setFormData({ ...formData, PurposeofVisit: v || '' })
            }
            styles={{ fieldGroup: { borderRadius: 8 } }}
          />
 
          {/* TABLE */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Pax Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Relationship</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <DatePicker
                        value={formData.Date}
                        onSelectDate={(d) =>
                          setFormData({ ...formData, Date: d || undefined })
                        }
                        textField={{ styles: { fieldGroup: { borderRadius: 8 } } }}
                      />
                    </td>
 
                    <td>
                      <TextField
                        value={row.paxName}
                        onChange={(_, v) => updateRow(i, 'paxName', v || '')}
                        styles={{ fieldGroup: { borderRadius: 8 } }}
                      />
                    </td>
 
                    <td>
                      <Dropdown
                        options={locationOptions}
                        selectedKey={formData.Source}
                        onChange={(_, o) =>
                          setFormData({ ...formData, Source: o?.key as string })
                        }
                        styles={{ dropdown: { borderRadius: 8 } }}
                      />
                    </td>
 
                    <td>
                      <Dropdown
                        options={locationOptions}
                        selectedKey={formData.Destination}
                        onChange={(_, o) =>
                          setFormData({ ...formData, Destination: o?.key as string })
                        }
                        styles={{ dropdown: { borderRadius: 8 } }}
                      />
                    </td>
 
                    <td>
                      <TextField
                        value={row.relationship}
                        onChange={(_, v) =>
                          updateRow(i, 'relationship', v || '')
                        }
                        styles={{ fieldGroup: { borderRadius: 8 } }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          <Stack horizontalAlign="center" style={{ marginTop: 16 }}>
            <PrimaryButton
              text="Submit"
              onClick={submitForm}
              styles={{
                root: {
                  backgroundColor: '#2E8B57',
                  borderRadius: 18,
                  padding: '8px 36px'
                }
              }}
            />
          </Stack>
 
        </Stack>
      </div>
    </Panel>
  </div>
);
}
 