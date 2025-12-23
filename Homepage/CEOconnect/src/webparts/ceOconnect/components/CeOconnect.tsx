import * as React from 'react';
import styles from './CeOconnect.module.scss';
import type { ICeOconnectProps } from './ICeOconnectProps';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ICEOMessage {
  Title: string;
  message: string;
  postdate: string;
}

export default class CeOconnect extends React.Component<ICeOconnectProps, any> {

  private _sp = spfi().using(SPFx(this.props.context));

  constructor(props: ICeOconnectProps) {
    super(props);

    this.state = {
      latest: null,
      allMessages: [],
      viewAll: false,
    };
  }

  public componentDidMount(): void {
    this.loadLatestMessage();
  }

  private async loadLatestMessage() {
    const items = await this._sp.web.lists
      .getByTitle("CEOmessage")
      .items
      .select("Title", "message", "postdate")
      .orderBy("postdate", false)
      .top(1)();

    this.setState({ latest: items[0], viewAll: false });
  }

  private async loadAllMessages() {
    const items = await this._sp.web.lists
      .getByTitle("CEOmessage")
      .items
      .select("Title", "message", "postdate")
      .orderBy("postdate", false)();

    this.setState({
      allMessages: items,
      viewAll: true,
    });
  }

 public render(): React.ReactElement<ICeOconnectProps> {
  const { latest, allMessages, viewAll } = this.state;

  return (
    <section className={styles.container}>

  {/* ============================
        HEADER BAR (Dynamic Button)
  ============================ */}
{/* ============================
      HEADER BAR (Dynamic Button + Date)
============================ */}
<div className={styles.headerBar}>
  <h2 className={styles.heading}>
    CEO Message
    {!viewAll && latest && (
      <span className={styles.postDate}>
        {" — " + new Date(latest.postdate).toLocaleDateString()}
      </span>
    )}
  </h2>

  {!viewAll ? (
    <button className={styles.viewBtn} onClick={() => this.loadAllMessages()}>
      View All
    </button>
  ) : (
    <button className={styles.recentBtn} onClick={() => this.loadLatestMessage()}>
      Recent Message
    </button>
  )}
</div>


  {/* ============================
          SHOW RECENT MESSAGE
  ============================ */}
  {!viewAll && latest && (
    <div className={styles.card + " " + styles.fadeUp}>

      {/* <h3 className={styles.title}>{latest.Title}</h3> */}

      <p className={styles.message}>{latest.message}</p>

      {/* <p className={styles.date}>
        {new Date(latest.postdate).toLocaleDateString()}
      </p> */}

    </div>
  )}


  {/* ============================
          VIEW ALL TABLE
  ============================ */}
  {viewAll && (
    <div className={styles.fadeUp}>

      <div className={styles.scrollContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {allMessages.map((item: ICEOMessage, index: number) => (
              <tr key={index} className={styles.fadeUp}>
                <td>{item.Title}</td>
                <td>{item.message}</td>
                <td>{new Date(item.postdate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )}

</section>

  );
}


  }

