import * as React from 'react';
import styles from './Newempdata.module.scss';
import { Stack, MessageBar, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp/presets/all";
import type { INewempdataProps } from './INewempdataProps';

import HRForm from './HRForm';
import ITForm from './ITForm';
import AdminForm from './AdminForm';

type Section = "HR" | "IT" | "ADMIN";
const STEPS: Section[] = ["HR", "IT", "ADMIN"];

interface IFormData {
  [key: string]: any;
}

interface IState {
  activeSection: Section;
  previousSection: Section;
  hrData: IFormData;
  itData: IFormData;
  adminData: IFormData;
  saving: boolean;
  success: boolean;
  error: string;
}

export default class Newempdata extends React.Component<INewempdataProps, IState> {
  private sp = spfi().using(SPFx(this.props.context));

  constructor(props: INewempdataProps) {
    super(props);
    this.state = {
      activeSection: "HR",
      previousSection: "HR",
      hrData: {},
      itData: {},
      adminData: {},
      saving: false,
      success: false,
      error: ""
    };
  }

  /** STEP NAVIGATION */
  private goToStep = (step: Section) => {
    this.setState(prev => ({
      previousSection: prev.activeSection,
      activeSection: step
    }));
  };

  /** GENERIC ONCHANGE */
  private handleChange = (section: Section, field: string, value: any) => {
    this.setState(prev => ({
      hrData: section === "HR" ? { ...prev.hrData, [field]: value } : prev.hrData,
      itData: section === "IT" ? { ...prev.itData, [field]: value } : prev.itData,
      adminData: section === "ADMIN" ? { ...prev.adminData, [field]: value } : prev.adminData,
    }));
  };

  /** SAVE EMPLOYEE */
  private saveEmployee = async () => {
    const { hrData, itData, adminData } = this.state;

    try {
      this.setState({ saving: true, error: "", success: false });
      const list = this.sp.web.lists.getByTitle("NewEmpData");
      const email = itData?.Email_ID;

      const existing = await list.items
        .filter(`Email_ID eq '${email}'`)
        .top(1)();

      const payload = {
        Title: hrData?.FirstName || "",
        ...hrData,
        ...itData,
        ...adminData
      };

      if (existing?.length > 0) {
        await list.items.getById(existing[0].Id).update(payload);
      } else {
        await list.items.add(payload);
      }

      this.setState({
        activeSection: "HR",
        previousSection: "HR",
        hrData: {},
        itData: {},
        adminData: {},
        success: true
      });

    } catch (e: any) {
      this.setState({ error: e?.message || "Something went wrong" });
    } finally {
      this.setState({ saving: false });
    }
  };

  /** SLIDE DIRECTION */
  private getSlideClass = () => {
    const { activeSection, previousSection } = this.state;
    return STEPS.indexOf(activeSection) > STEPS.indexOf(previousSection)
      ? styles.slideFromRight
      : styles.slideFromLeft;
  };

  /** STEPPER */
  private renderStepper() {
    const { activeSection, hrData, itData } = this.state;

    return (
      <div className={styles.stepper}>
        {STEPS.map(step => {
          const disabled =
            (step === "IT" && !hrData?.FirstName) ||
            (step === "ADMIN" && !itData?.Email_ID);

          return (
            <button
              key={step}
              disabled={disabled}
              className={`${styles.stepBtn} ${activeSection === step ? styles.active : ""}`}
              onClick={() => this.goToStep(step)}
            >
              {step}
            </button>
          );
        })}
      </div>
    );
  }

  public render() {
    const { activeSection, hrData, itData, adminData, saving, success, error } = this.state;

    return (
      <section className={styles.newempdata}>
        <Stack tokens={{ childrenGap: 18 }}>
          <h2>New Employee Onboarding</h2>

          {this.renderStepper()}

          {success && <MessageBar messageBarType={MessageBarType.success}>Employee saved successfully</MessageBar>}
          {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

          {/* FORM SLIDE CONTAINER */}
          <div className={styles.formWrapper}>
            <div className={`${styles.formCard} ${this.getSlideClass()}`}>

              {activeSection === "HR" && (
                <HRForm
                  data={hrData}
                  onChange={(f: string, v: any) => this.handleChange("HR", f, v)}
                  onNext={() => this.goToStep("IT")}
                />
              )}

              {activeSection === "IT" && (
                <ITForm
                  data={itData}
                  onChange={(f: string, v: any) => this.handleChange("IT", f, v)}
                  onNext={() => this.goToStep("ADMIN")}
                />
              )}

              {activeSection === "ADMIN" && (
                <AdminForm
                  data={adminData}
                  onChange={(f: string, v: any) => this.handleChange("ADMIN", f, v)}
                  onSubmit={this.saveEmployee}
                  saving={saving}
                />
              )}

            </div>
          </div>
        </Stack>
      </section>
    );
  }
}
