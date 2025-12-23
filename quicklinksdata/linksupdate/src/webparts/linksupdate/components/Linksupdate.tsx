import * as React from 'react';
import styles from './Linksupdate.module.scss';
import { ILinksupdateProps } from './ILinksupdateProps';
import StaffOnLeaveForm from './StaffOnLeaveForm';


interface ILinksupdateState {
  showHyderabadForm: boolean;
}

export default class Linksupdate extends React.Component<
  ILinksupdateProps,
  ILinksupdateState
> {
  constructor(props: ILinksupdateProps) {
    super(props);
    this.state = {
      showHyderabadForm: false
    };
  }

  private quickLinks = [
    { title: "", url: "https://www.tripadvisor.in/Attractions-g297668-Activities-Jodhpur_Jodhpur_District_Rajasthan.html" },
    { title: "Hyderabad", url: "" },
    { title: "", url: "https://www.microsoft.com" },
    { title: "", url: "https://www.linkedin.com" },
    { title: "", url: "https://www.facebook.com" },
    { title: "", url: "https://www.amazon.in" },
    { title: "", url: "https://www.microsoft.com" },
    { title: "", url: "https://www.linkedin.com" },
    { title: "", url: "https://www.facebook.com" },
    { title: "", url: "https://www.amazon.in" },
     { title: "", url: "https://www.microsoft.com" },
    { title: "", url: "https://www.linkedin.com" },
    { title: "", url: "https://www.facebook.com" },
    { title: "", url: "https://www.amazon.in" },
    { title: "", url: "https://www.microsoft.com" }
   
   

  ];

  public render(): React.ReactElement<ILinksupdateProps> {
    return (
      <section className={styles.container}>

        {/* LOCATION GRID */}
        <div className={styles.linkGrid}>
          {this.quickLinks.map((item, index) => {

            if (item.title === "Hyderabad") {
              return (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => this.setState({ showHyderabadForm: true })}
                >
                  {item.title}
                </div>
              );
            }

            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {item.title}
              </a>
            );
          })}
        </div>

        {/* HYDERABAD FORM */}
        {this.state.showHyderabadForm && (
          <StaffOnLeaveForm
            context={this.props.context}
            onClose={() => this.setState({ showHyderabadForm: false })}
          />
        )}

      </section>
    );
  }
}
