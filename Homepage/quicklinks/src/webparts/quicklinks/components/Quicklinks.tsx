import * as React from 'react';
import styles from './Quicklinks.module.scss';
import { IQuicklinksProps } from './IQuicklinksProps';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin,FaYoutube } from "react-icons/fa";

export default class Quicklinks extends React.Component<IQuicklinksProps> {

  private socialLinks = [
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/officialstarair/ " },
    { name: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/OfficialStarAir/ " },
    { name: "Twitter", icon: <FaTwitter />, url: "https://x.com/OfficialStarAir" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://in.linkedin.com/company/officalstarair" },
    { name: "youtube", icon: <FaYoutube />, url: "https://www.youtube.com/@OfficialStarAir" }
  ];

  public render(): React.ReactElement<IQuicklinksProps> {
    return (
      <section className={styles.socialContainer}>
        {this.socialLinks.map((item, index) => (
          <div
            key={index}
            className={styles.iconBox}
            title={item.name}
            onClick={() => window.open(item.url, "_blank")}
          >
            {item.icon}
          </div>
        ))}
      </section>
    );
  }
}


// import * as React from 'react';
// import styles from './Quicklinks.module.scss';
// import { IQuicklinksProps } from './IQuicklinksProps';

// export default class Quicklinks extends React.Component<IQuicklinksProps> {

//   private socialLinks = [
//     { name: "Instagram", icon: "/assets/Instagram_icon.png", url: "https://www.instagram.com/officialstarair/" },
//     { name: "Facebook",  icon: "/icons/facebook.svg",  url: "https://www.facebook.com/OfficialStarAir/" },
//     { name: "Twitter",   icon: "/icons/twitter.svg",   url: "https://x.com/OfficialStarAir" },
//     { name: "LinkedIn",  icon: "/icons/linkedin.svg",  url: "https://in.linkedin.com/company/officalstarair" },
//     { name: "YouTube",   icon: "/icons/youtube.svg",   url: "https://www.youtube.com/@OfficialStarAir" }
//   ];

//   public render(): React.ReactElement<IQuicklinksProps> {
//     return (
//       <section className={styles.socialContainer}>
//         {this.socialLinks.map((item, index) => (
//           <div
//             key={index}
//             className={styles.iconBox}
//             title={item.name}
//             onClick={() => window.open(item.url, "_blank")}
//           >
//             <img 
//               src={item.icon} 
//               alt={item.name} 
//               className={styles.socialIcon} 
//             />
//           </div>
//         ))}
//       </section>
//     );
//   }
// }
