import * as React from 'react';
import styles from './Engineering.module.scss';
import type { IEngineeringProps } from './IEngineeringProps';
import { FaChevronDown } from "react-icons/fa"; 


export default class Engineering extends React.Component<IEngineeringProps> {
  private buttons = [
    { title: "Policy", url: "/sites/PolicyCenter/Lists/Policy/AllItems.aspx" },
    { title: "Procedure", url: "/sites/PolicyCenter/Lists/Procedure/AllItems.aspx" },
    { title: "Process", url: "/sites/PolicyCenter/Lists/Process/AllItems.aspx" },
    { title: "Shared Files", url: "https://sf71.sharepoint.com/sites/DemoStarAir/Shared%20Media/Forms/AllItems.aspx" },
    { title: "Media", url: "https://sf71.sharepoint.com/sites/DemoStarAir/Mediapolicy/Forms/AllItems.aspx" }
  ];

  private menuItems = [
    {
      title: "Links",
      children: [
        { title: "Our comapany website", url: "https://www.starair.in" },
        { title: "Our Company Intranet", url: "https://apps.starair.co.in/security/Login" },
        { title: "Our Company HR Portal", url: "https://portal.zinghr.com/2015/pages/authentication/login.aspx" }
      ]
    }
  ];

  public render(): React.ReactElement<IEngineeringProps> {
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
