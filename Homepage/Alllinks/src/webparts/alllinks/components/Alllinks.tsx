import * as React from 'react';
import styles from './Alllinks.module.scss';
import type { IAlllinksProps } from './IAlllinksProps';

export default class Alllinks extends React.Component<IAlllinksProps> {

  private quickLinks = [
    { title: "Jodhpur", url: "https://www.tripadvisor.in/Attractions-g297668-Activities-Jodhpur_Jodhpur_District_Rajasthan.html" },
    { title: "Hyderabad", url: "https://www.tripadvisor.in/Attractions-g297586-Activities-Hyderabad_Hyderabad_District_Telangana.html" },
    { title: "Nagpur", url: "https://www.microsoft.com" },
    { title: "Jamnagar", url: "https://www.linkedin.com" },
    { title: "Nagpur", url: "https://www.instagram.com" },
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

  public render(): React.ReactElement<IAlllinksProps> {

    return (
      <section className={styles.container}>

        {/* <h2 className={styles.heading}>Quick Links</h2> */}

        <div className={styles.linkGrid}>
          {this.quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <span className={styles.cardTitle}>{item.title}</span>
            </a>
          ))}
        </div>

      </section>
    );
  }
}
