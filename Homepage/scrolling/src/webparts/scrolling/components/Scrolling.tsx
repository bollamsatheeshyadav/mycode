import * as React from 'react';
import styles from './Scrolling.module.scss';
import type { IScrollingProps } from './IScrollingProps';
import { SPHttpClient } from '@microsoft/sp-http';

export default class Scrolling extends React.Component<IScrollingProps, { messages: string[] }> {
  constructor(props: IScrollingProps) {
    super(props);
    this.state = { messages: [] };
  }

  public componentDidMount(): void {
    this._loadMessages();
  }

  private async _loadMessages(): Promise<void> {
    const response = await this.props.spHttpClient.get(
      `${this.props.siteUrl}/_api/web/lists/getbytitle('StarAir notifications')/items?$filter=Status eq 'Active'&$select=Message`,
      SPHttpClient.configurations.v1   // ✅ use static member
    );

    const data = await response.json();
    const activeMessages = data.value.map((item: any) => item.Message);
    this.setState({ messages: activeMessages });
  }

  public render(): React.ReactElement<IScrollingProps> {
    return (
      <section className={styles.scrollingContainer}>
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            {this.state.messages.length > 0
              ? this.state.messages.join(' | ')
              : 'No active notifications'}
          </div>
        </div>
      </section>
    );
  }
}
