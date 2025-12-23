import * as React from 'react';
import styles from './Airportservice.module.scss';
import type { IAirportserviceProps } from './IAirportserviceProps';
import { FaChevronDown } from "react-icons/fa"; 


export default class Airportservice extends React.Component<IAirportserviceProps> {
 private buttons = [
    { title: "Policy", url: "https://ghodawatent.sharepoint.com/sites/UATAirportServices/Policies/Forms/AllItems.aspx" },
    { title: "Procedure", url: "https://ghodawatent.sharepoint.com/sites/UATAirportServices/Procedures/Forms/AllItems.aspx" },
    { title: "Process", url: "https://ghodawatent.sharepoint.com/sites/UATAirportServices/Processes/Forms/AllItems.aspx" },
    { title: "Shared Files", url: "https://ghodawatent.sharepoint.com/sites/UATAirportServices/Shared%20Files/Forms/AllItems.aspx" },
    { title: "Media", url: "https://ghodawatent.sharepoint.com/sites/UATAirportServices/Shared%20Media/Forms/AllItems.aspx" }
  ];

  private menuItems = [
    {
      title: "Links",
      children: [
        { title: "Our comapany website", url: "https://www.starair.in" },
        { title: "Our Company Intranet", url: "https://apps.starair.co.in/security/Login" },
        { title: "Our Company HR Portal", url: "https://portal.zinghr.com/2015/pages/authentication/login.aspx" },
        { title: "SOL/SOD", url: "https://ghodawatent.sharepoint.com/sites/UATAdministration/Lists/Travel%20requests/AllItems.aspx" }
      ]
    }
  ];

  public render(): React.ReactElement<IAirportserviceProps> {
    return (
      <section className={styles.policyContainer}>

        <div className={styles.buttonWrapper}>

          {/* Regular Buttons */}
          {this.buttons.map((btn, index) => (
            <button
              key={index}
              className={styles.actionButton}
              onClick={() => window.open(btn.url, "_blank")}
            >
              {btn.title}
            </button>
          ))}

          {/* Dropdown Button */}
          <div className={styles.dropdown}>
            <button className={styles.actionButton}>
              {this.menuItems[0].title} <FaChevronDown className={styles.dropIcon} />
            </button>

            <div className={styles.curtainMenu}>
              {this.menuItems[0].children.map((child, i) => (
                <a key={i} href={child.url} target="_blank">
                  {child.title}
                </a>
              ))}
            </div>
          </div>

        </div>

      </section>
    );
  }

}
