import * as React from 'react';
import {
  TextField,
  Panel,
  PanelType,
  Dropdown,
  IDropdownOption,
  DatePicker,
  PrimaryButton,
  Stack
} from '@fluentui/react';

import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

/* ✅ INTERFACES */
interface IPaxRow {
  paxName: string;
  relationship: string;
}

interface IStaffOnLeaveFormProps {
  context: WebPartContext;
  onClose: () => void;
}

export default function StaffOnLeaveForm(props: IStaffOnLeaveFormProps) {

  const sp = React.useMemo(
    () => spfi().using(SPFx(props.context)),
    [props.context]
  );

  const [formData, setFormData] = React.useState({
    NameofEmployee: '',
    StarEmployeeID: '',
    Department: '',
    PurposeofVisit: '',
    Date: undefined as Date | undefined,
    Source: '',
    Destination: ''
  });

  /* 🔹 Load user info */
  React.useEffect(() => {
    props.context.spHttpClient
      .get(
        `${props.context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
        SPHttpClient.configurations.v1
      )
      .then(res => res.json())
      .then(data => {
        const dept = data.UserProfileProperties?.find(
          (p: any) => p.Key === 'Department'
        )?.Value;

        setFormData(prev => ({
          ...prev,
          NameofEmployee: props.context.pageContext.user.displayName,
          Department: dept || ''
        }));
      })
      .catch(console.error);
  }, []);

  /* 🔹 Pax rows (ES5 SAFE) */
  const createInitialRows = (): IPaxRow[] => {
    const rows: IPaxRow[] = [];
    for (let i = 0; i < 6; i++) {
      rows.push({ paxName: '', relationship: '' });
    }
    return rows;
  };

  const [rows, setRows] = React.useState<IPaxRow[]>(createInitialRows());

  const updateRow = (
    index: number,
    field: 'paxName' | 'relationship',
    value: string
  ) => {
    const copy = rows.slice();
    copy[index][field] = value;
    setRows(copy);
  };

  const locationOptions: IDropdownOption[] = [
    'Belgum','Ahmedabad','Yapathi','BiAI','Hindon','Kalabugai',
    'Surat','Nagpur','Pune','Kolhap','Toon','Junhin',
    'Lucknow','Training Centre','BiAH','BiHo Ground How','HAL','Bangalore'
  ].map(x => ({ key: x, text: x }));

  const isValid = () =>
    !!(
      formData.StarEmployeeID &&
      formData.PurposeofVisit &&
      formData.Date &&
      formData.Source &&
      formData.Destination &&
      rows.some(r => r.paxName || r.relationship)
    );

  const submitForm = async () => {
    if (!isValid()) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await sp.web.lists.getByTitle('Staff On Leave').items.add({
        ...formData,
        PaxName: rows[0]?.paxName,
        PaxName2: rows[1]?.paxName,
        PaxName3: rows[2]?.paxName,
        PaxName4: rows[3]?.paxName,
        PaxName5: rows[4]?.paxName,
        PaxName6: rows[5]?.paxName,

        RelationshipwithEmployee: rows[0]?.relationship,
        RelationshipwithEmployee2: rows[1]?.relationship,
        RelationshipwithEmployee3: rows[2]?.relationship,
        RelationshipwithEmployee4: rows[3]?.relationship,
        RelationshipwithEmployee5: rows[4]?.relationship,
        RelationshipwithEmployee6: rows[5]?.relationship
      });

      alert('Form submitted successfully');
      props.onClose();
    } catch (e) {
      console.error(e);
      alert('Submission failed');
    }
  };

  return (
    <Panel
      isOpen
      onDismiss={props.onClose}
      type={PanelType.custom}
      customWidth="850px"
      isLightDismiss
    >
      <h3>Staff On Leave</h3>

      <Stack tokens={{ childrenGap: 10 }}>
        <TextField label="Employee Name" value={formData.NameofEmployee} disabled />
        <TextField
          label="Star Employee ID"
          required
          value={formData.StarEmployeeID}
          onChange={(_, v) => setFormData({ ...formData, StarEmployeeID: v || '' })}
        />
        <TextField label="Department" value={formData.Department} disabled />
        <TextField
          label="Purpose of Visit"
          required
          multiline
          value={formData.PurposeofVisit}
          onChange={(_, v) => setFormData({ ...formData, PurposeofVisit: v || '' })}
        />

        {rows.map((r, i) => (
          <Stack horizontal key={i} tokens={{ childrenGap: 8 }}>
            <DatePicker
              value={formData.Date}
              onSelectDate={d => setFormData({ ...formData, Date: d || undefined })}
            />
            <TextField
              placeholder="Pax Name"
              value={r.paxName}
              onChange={(_, v) => updateRow(i, 'paxName', v || '')}
            />
            <Dropdown
              options={locationOptions}
              selectedKey={formData.Source}
              onChange={(_, o) =>
                setFormData({ ...formData, Source: o?.key as string })
              }
            />
            <Dropdown
              options={locationOptions}
              selectedKey={formData.Destination}
              onChange={(_, o) =>
                setFormData({ ...formData, Destination: o?.key as string })
              }
            />
            <TextField
              placeholder="Relationship"
              value={r.relationship}
              onChange={(_, v) => updateRow(i, 'relationship', v || '')}
            />
          </Stack>
        ))}

        <PrimaryButton text="Submit" onClick={submitForm} />
      </Stack>
    </Panel>
  );
}
