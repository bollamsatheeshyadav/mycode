import * as React from 'react';
import styles from './Updatelinks.module.scss';
import type { IUpdatelinksProps } from './IUpdatelinksProps';

// 👉 Import your Hyderabad form
import StaffOnLeaveForm from './StaffOnLeaveForm/StaffOnLeaveForm';

interface IUpdatelinksState {
  showHyderabadForm: boolean;
}

export default class Updatelinks extends React.Component<IUpdatelinksProps, IUpdatelinksState> {

  constructor(props: IUpdatelinksProps) {
    super(props);
    this.state = {
      showHyderabadForm: false
    };
  }

  private quickLinks = [
    { title: "Jodhpur", url: "https://www.tripadvisor.in/Attractions-g297668-Activities-Jodhpur_Jodhpur_District_Rajasthan.html" },
    { title: "Hyderabad", url: "" }, // 🔹 URL not needed
    { title: "Nagpur", url: "https://www.microsoft.com" },
    { title: "Jamnagar", url: "https://www.linkedin.com" },
    { title: "Kolhapur", url: "https://www.facebook.com" },
    { title: "Jalpur", url: "https://www.twitter.com" },
    { title: "Pune", url: "https://www.amazon.in" },
    { title: "Shivamogga", url: "https://www.flipkart.com" },
    { title: "Mopa", url: "https://chat.openai.com" },
    { title: "Lucknow", url: "https://www.office.com" },
    { title: "Nanded", url: "https://teams.microsoft.com" },
    { title: "Adampur", url: "https://outlook.office.com" },
    { title: "Ahmedabad", url: "https://www.tripadvisor.in/Attractions-g297608-Activities-Ahmedabad_Ahmedabad_District_Gujarat.html" },
    { title: "Surat", url: "https://stackoverflow.com" }
  ];

  public render(): React.ReactElement<IUpdatelinksProps> {

    return (
      <section className={styles.container}>

        {/* 🔹 LOCATION BUTTONS */}
        <div className={styles.linkGrid}>
          {this.quickLinks.map((item, index) => {

            // ✅ HYDERABAD → OPEN FORM
            if (item.title === 'Hyderabad') {
              return (
                <div
                  key={index}
                  className={styles.card}
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.setState({ showHyderabadForm: true })}
                >
                  <span className={styles.cardTitle}>{item.title}</span>
                </div>
              );
            }

            // ✅ OTHER LOCATIONS → OPEN URL
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <span className={styles.cardTitle}>{item.title}</span>
              </a>
            );
          })}
        </div>

        {/* 🔹 HYDERABAD FORM */}
        {this.state.showHyderabadForm && (
          <StaffOnLeaveForm
            context={this.props.context}
          />
        )}

      </section>
    );
  }
}
