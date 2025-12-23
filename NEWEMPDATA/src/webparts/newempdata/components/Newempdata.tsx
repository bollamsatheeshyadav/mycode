
import * as React from 'react';
import styles from './Newempdata.module.scss';
import { Pivot, PivotItem } from "@fluentui/react";
import type { INewempdataProps } from './INewempdataProps';
import {
  TextField,
  PrimaryButton,
  DatePicker,
  Stack,
  MessageBar,
  MessageBarType
} from '@fluentui/react';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

type Section = "HR" | "IT" | "ADMIN";

export interface INewempdataState {
  activeSection: Section;
  hrSubmitted: boolean;

  // HR
  First_Name: string;
  Last_Name: string;
  DOB: Date | null;
  Phone_Number: string;
  Location: string;
  Department: string;

  // IT
  Office_365_License: string;
  Email_ID: string;
  Do_You_Need_SharePoint_Access: string;
  // TeamsAccess: string;
  Laptop_configuration: string;

  // ADMIN
  Desktop_Configuration: string;
  Price_for_Device: string;
  Desk: string;
  APT: string;
  Uniform: string;
  Mobile: string;
  Sim: string;
  Status: string;

  success: boolean;
  error: string;
}

export default class Newempdata extends React.Component<
  INewempdataProps,
  INewempdataState
> {

  private sp = spfi().using(SPFx(this.props.context));

  constructor(props: INewempdataProps) {
    super(props);

    this.state = {
      activeSection: "HR",
      hrSubmitted: false,

      First_Name: '',
      Last_Name: '',
      DOB: null,
      Phone_Number: '',
      Location: '',
      Department: '',

      Office_365_License: '',
      Email_ID: '',
      Do_You_Need_SharePoint_Access: '',
      // TeamsAccess: '',
      Laptop_configuration: '',

      Desktop_Configuration: '',
      Price_for_Device: '',
      Desk: '',
      APT: '',
      Uniform: '',
      Mobile: '',
      Sim: '',
      Status: '',

      success: false,
      error: ''
    };
  }

  // ================= HR SAVE =================
  private saveHR = async () => {
    try {
      await this.sp.web.lists.getByTitle("NewEmpData").items.add({
        Title: this.state.First_Name,
        First_Name: this.state.First_Name,
        Last_Name: this.state.Last_Name,
        DOB: this.state.DOB ?? null,
        Phone_Number: this.state.Phone_Number,
        Location: this.state.Location,
        Department: this.state.Department
      });

      this.setState({
        hrSubmitted: true,
        activeSection: "IT",
        success: true,
        error: ""
      });

    } catch (err: any) {
      this.setState({ error: err.message, success: false });
    }
  };

  // ================= IT SAVE =================
  private saveIT = async () => {
    try {
      await this.sp.web.lists.getByTitle("NewEmpData").items.add({
        Title: this.state.Email_ID,
        Office_365_License: this.state.Office_365_License,
        Email_ID: this.state.Email_ID,
        Do_You_Need_SharePoint_Access: this.state.Do_You_Need_SharePoint_Access,
        // TeamsAccess: this.state.TeamsAccess,
        Laptop_configuration: this.state.Laptop_configuration
      });

      this.setState({
        activeSection: "ADMIN",
        success: true,
        error: ""
      });

    } catch (err: any) {
      this.setState({ error: err.message, success: false });
    }
  };

  // ================= ADMIN SAVE =================
  private saveAdmin = async () => {
    try {
      await this.sp.web.lists.getByTitle("NewEmpData").items.add({
        Title: this.state.Status,
        Desktop_Configuration: this.state.Desktop_Configuration,
        Price_for_Device: this.state.Price_for_Device,
        Desk: this.state.Desk,
        APT: this.state.APT,
        Uniform: this.state.Uniform,
        Mobile: this.state.Mobile,
        Sim: this.state.Sim
        
      });

      this.setState({ success: true, error: '' });

    } catch (err: any) {
      this.setState({ error: err.message, success: false });
    }
  };

  // ================= RENDER =================
  public render(): React.ReactElement<INewempdataProps> {
    const { activeSection } = this.state;


    return (
      <section className={styles.newempdata}>
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { maxWidth: 900 } }}>

          <h2>New Employee Onboarding</h2>

          {/* NAVIGATION */}
          <Pivot
  selectedKey={activeSection}
  onLinkClick={(item) => {
    const key = item?.props.itemKey as Section;

    // 🚫 Prevent IT / ADMIN click until HR submitted
    if (!this.state.hrSubmitted && (key === "IT" || key === "ADMIN")) {
      return;
    }

    this.setState({ activeSection: key });
  }}
>
  <PivotItem headerText="HR" itemKey="HR" itemIcon="Contact" />
  <PivotItem headerText="IT" itemKey="IT" itemIcon="LaptopSecure" />
  <PivotItem headerText="ADMIN" itemKey="ADMIN" itemIcon="Settings" />
</Pivot>

          {this.state.success && (
            <MessageBar messageBarType={MessageBarType.success}>
              Data saved successfully
            </MessageBar>
          )}

          {this.state.error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {this.state.error}
            </MessageBar>
          )}

          {/* SLIDE ANIMATION WRAPPER */}
          <div key={activeSection} className={styles.sectionAnimation}>

            {/* HR */}
            {activeSection === "HR" && (
              <>
                <h3>👤 HR Details</h3>
                <TextField label="First Name" onChange={(_, v) => this.setState({ First_Name: v || '' })} />
                <TextField label="Last Name" onChange={(_, v) => this.setState({ Last_Name: v || '' })} />
                <DatePicker
                  label="DOB"
                  onSelectDate={(d) => this.setState({ DOB: d ?? null })}
                />
                <TextField label="Phone Number" onChange={(_, v) => this.setState({ Phone_Number: v || '' })} />
                <TextField label="Location" onChange={(_, v) => this.setState({ Location: v || '' })} />
                <TextField label="Department" onChange={(_, v) => this.setState({ Department: v || '' })} />

                <PrimaryButton text="Submit HR" onClick={this.saveHR} />
              </>
            )}

            {/* IT */}
            {activeSection === "IT" && (
              <>
                <h3>💻 IT Details</h3>
                <TextField label="Office 365 License" onChange={(_, v) => this.setState({ Office_365_License: v || '' })} />
                <TextField label="Email ID" onChange={(_, v) => this.setState({ Email_ID: v || '' })} />
                <TextField label="SharePoint Access" onChange={(_, v) => this.setState({ Do_You_Need_SharePoint_Access: v || '' })} />
                {/* <TextField label="Teams Access" onChange={(_, v) => this.setState({ TeamsAccess: v || '' })} /> */}
                <TextField label="Laptop Configuration" onChange={(_, v) => this.setState({ Laptop_configuration: v || '' })} />

                <PrimaryButton text="Submit IT" onClick={this.saveIT} />
              </>
            )}

            {/* ADMIN */}
            {activeSection === "ADMIN" && (
              <>
                <h3>⚙️ Admin Details</h3>
                <TextField label="Desktop Configuration" onChange={(_, v) => this.setState({ Desktop_Configuration: v || '' })} />
                <TextField label="Price for Device" onChange={(_, v) => this.setState({ Price_for_Device: v || '' })} />
                <TextField label="Desk" onChange={(_, v) => this.setState({ Desk: v || '' })} />
                <TextField label="APT" onChange={(_, v) => this.setState({ APT: v || '' })} />
                <TextField label="Uniform" onChange={(_, v) => this.setState({ Uniform: v || '' })} />
                <TextField label="Mobile" onChange={(_, v) => this.setState({ Mobile: v || '' })} />
                <TextField label="SIM" onChange={(_, v) => this.setState({ Sim: v || '' })} />
                

                <PrimaryButton text="Submit ADMIN" onClick={this.saveAdmin} />
              </>
            )}

          </div>
        </Stack>
      </section>
    );
  }
}
