import * as React from 'react';
import styles from './Newemponboard.module.scss';
import type { INewemponboardProps } from './INewemponboardProps';
import { spfi, SPFx } from "@pnp/sp/presets/all";

interface State {
  activeTab: 'HR' | 'IT' | 'Admin';
  itemId?: number;

  hr: {
    First_Name: string;
    Last_Name: string;
    DOB: string;
    Phone_Number: string;
    Location: string;
    Department: string;
  };

  it: {
    Office_365_License: string;
    Email_ID: string;
    Do_You_Need_SharePoint_Access: string;
    Do_you_need_Teams_application_access: string;
    Laptop_configuration: string;
  };

  admin: {
    Desktop_Configuration: string;
    Price_for_Device: string;
    Desk: string;
    APT: string;
    Uniform: string;
    Mobile: string;
    Sim: string;
    Status: string;
  };

  loading: boolean;
  message: string | null;
}

export default class Newemponboard extends React.Component<INewemponboardProps, State> {

  private sp: any;

  constructor(props: INewemponboardProps) {
    super(props);

    this.sp = spfi().using(SPFx(this.props.context));

    this.state = {
      activeTab: 'HR',
      loading: false,
      message: null,

      hr: {
        First_Name: '',
        Last_Name: '',
        DOB: '',
        Phone_Number: '',
        Location: '',
        Department: ''
      },

      it: {
        Office_365_License: '',
        Email_ID: '',
        Do_You_Need_SharePoint_Access: '',
        Do_you_need_Teams_application_access: '',
        Laptop_configuration: ''
      },

      admin: {
        Desktop_Configuration: '',
        Price_for_Device: '',
        Desk: '',
        APT: '',
        Uniform: '',
        Mobile: '',
        Sim: '',
        Status: 'Rejected'
      }
    };
  }

  // ---------- UPDATE HELPERS ----------
  private updateHR = (key: string, value: string) => {
    this.setState({ hr: { ...this.state.hr, [key]: value } });
  };

  private updateIT = (key: string, value: string) => {
    this.setState({ it: { ...this.state.it, [key]: value } });
  };

  private updateAdmin = (key: string, value: string) => {
    this.setState({ admin: { ...this.state.admin, [key]: value } });
  };

  // ---------- HR SUBMIT ----------
  private submitHR = async () => {
    this.setState({ loading: true, message: null });

    try {
      const res = await this.sp.web.lists
        .getByTitle('NewEmpData')
        .items.add({
          Title: `${this.state.hr.First_Name} ${this.state.hr.Last_Name}`,
          ...this.state.hr
        });

      const item = await res.item.get();

      this.setState({
        itemId: item.Id,
        activeTab: 'IT',
        loading: false,
        message: 'HR details saved successfully'
      });

    } catch (e) {
      console.error(e);
      this.setState({ loading: false, message: 'Error saving HR details' });
    }
  };

  // ---------- IT SUBMIT ----------
  private submitIT = async () => {
    if (!this.state.itemId) return;

    this.setState({ loading: true, message: null });

    try {
      await this.sp.web.lists
        .getByTitle('NewEmpData')
        .items.getById(this.state.itemId)
        .update({
          ...this.state.it
        });

      this.setState({
        activeTab: 'Admin',
        loading: false,
        message: 'IT details saved successfully'
      });

    } catch (e) {
      console.error(e);
      this.setState({ loading: false, message: 'Error saving IT details' });
    }
  };

  // ---------- ADMIN SUBMIT ----------
  private submitAdmin = async () => {
    if (!this.state.itemId) return;

    this.setState({ loading: true, message: null });

    try {
      await this.sp.web.lists
        .getByTitle('NewEmpData')
        .items.getById(this.state.itemId)
        .update({
          ...this.state.admin
        });

      this.setState({
        loading: false,
        message: 'Employee onboarding completed successfully'
      });

    } catch (e) {
      console.error(e);
      this.setState({ loading: false, message: 'Error saving Admin details' });
    }
  };

  // ---------- RENDER ----------
  public render(): React.ReactElement<INewemponboardProps> {

    const { activeTab, hr, it, admin, loading, message } = this.state;

    return (
      <section className={styles.newemponboard}>

        {/* Tabs */}
        <div className={styles.tabBar}>
          <button className={activeTab === 'HR' ? styles.activeTab : ''}>HR</button>
          <button className={activeTab === 'IT' ? styles.activeTab : ''}>IT</button>
          <button className={activeTab === 'Admin' ? styles.activeTab : ''}>Admin</button>
        </div>

        {/* HR */}
        {activeTab === 'HR' && (
          <div className={styles.frame}>
            <h3>HR Form</h3>
            <input placeholder="First Name" value={hr.First_Name} onChange={e => this.updateHR('First_Name', e.target.value)} />
            <input placeholder="Last Name" value={hr.Last_Name} onChange={e => this.updateHR('Last_Name', e.target.value)} />
            <input type="date" value={hr.DOB} onChange={e => this.updateHR('DOB', e.target.value)} />
            <input placeholder="Phone Number" value={hr.Phone_Number} onChange={e => this.updateHR('Phone_Number', e.target.value)} />
            <input placeholder="Location" value={hr.Location} onChange={e => this.updateHR('Location', e.target.value)} />
            <input placeholder="Department" value={hr.Department} onChange={e => this.updateHR('Department', e.target.value)} />
            <button disabled={loading} onClick={this.submitHR}>Submit HR</button>
          </div>
        )}

        {/* IT */}
        {activeTab === 'IT' && (
          <div className={styles.frame}>
            <h3>IT Form</h3>
            <input placeholder="Office 365 License" value={it.Office_365_License} onChange={e => this.updateIT('Office_365_License', e.target.value)} />
            <input placeholder="Email ID" value={it.Email_ID} onChange={e => this.updateIT('Email_ID', e.target.value)} />
            <input placeholder="Need SharePoint Access" value={it.Do_You_Need_SharePoint_Access} onChange={e => this.updateIT('Do_You_Need_SharePoint_Access', e.target.value)} />
            <input placeholder="Need Teams Access" value={it.Do_you_need_Teams_application_access} onChange={e => this.updateIT('Do_you_need_Teams_application_access', e.target.value)} />
            <input placeholder="Laptop Configuration" value={it.Laptop_configuration} onChange={e => this.updateIT('Laptop_configuration', e.target.value)} />
            <button disabled={loading} onClick={this.submitIT}>Submit IT</button>
          </div>
        )}

        {/* ADMIN */}
        {activeTab === 'Admin' && (
          <div className={styles.frame}>
            <h3>Admin Form</h3>
            <input placeholder="Desktop Configuration" value={admin.Desktop_Configuration} onChange={e => this.updateAdmin('Desktop_Configuration', e.target.value)} />
            <input placeholder="Price for Device" value={admin.Price_for_Device} onChange={e => this.updateAdmin('Price_for_Device', e.target.value)} />
            <input placeholder="Desk" value={admin.Desk} onChange={e => this.updateAdmin('Desk', e.target.value)} />
            <input placeholder="APT" value={admin.APT} onChange={e => this.updateAdmin('APT', e.target.value)} />
            <input placeholder="Uniform" value={admin.Uniform} onChange={e => this.updateAdmin('Uniform', e.target.value)} />
            <input placeholder="Mobile" value={admin.Mobile} onChange={e => this.updateAdmin('Mobile', e.target.value)} />
            <input placeholder="Sim" value={admin.Sim} onChange={e => this.updateAdmin('Sim', e.target.value)} />

            <select value={admin.Status} onChange={e => this.updateAdmin('Status', e.target.value)}>
              <option value="Rejected">Rejected</option>
              <option value="Approved">Approved</option>
            </select>

            <button disabled={loading} onClick={this.submitAdmin}>Submit Admin</button>
          </div>
        )}

        {message && <p className={styles.msg}>{message}</p>}
      </section>
    );
  }
}
