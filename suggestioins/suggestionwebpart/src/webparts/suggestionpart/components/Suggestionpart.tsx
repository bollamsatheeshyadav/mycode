import * as React from 'react';
import styles from './Suggestionpart.module.scss';
import type { ISuggestionpartProps } from './ISuggestionpartProps';
import { TextField, Dropdown, IDropdownOption, PrimaryButton, MessageBar, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface ISuggestionpartState {
  title: string;
  feedback: string;
  category: string;
  rating: string;
  message: string;
  messageType: MessageBarType;
}

export default class Suggestionpart extends React.Component<ISuggestionpartProps, ISuggestionpartState> {
  private sp: any;

  constructor(props: ISuggestionpartProps) {
    super(props);
    this.state = {
      title: '',
      feedback: '',
      category: '',
      rating: '',
      message: '',
      messageType: MessageBarType.info
    };

    // Initialize PnPjs
    this.sp = spfi().using(SPFx(this.props.context));
  }

  private categoryOptions: IDropdownOption[] = [
    { key: 'Product', text: 'Product' },
    { key: 'Service', text: 'Service' },
    { key: 'Other', text: 'Other' }
  ];

  private ratingOptions: IDropdownOption[] = [
    { key: 'Excellent', text: 'Excellent' },
    { key: 'Good', text: 'Good' },
    { key: 'Average', text: 'Average' },
    { key: 'Poor', text: 'Poor' }
  ];

  private handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const target = event.currentTarget;
    this.setState({ ...this.state, [target.name]: newValue || '' });
  }

  private handleDropdownChange = (field: string, option?: IDropdownOption) => {
    this.setState({ ...this.state, [field]: option ? option.key.toString() : '' });
  }

  private handleSubmit = async () => {
    const { title, feedback, category, rating } = this.state;

    if (!title || !feedback || !category || !rating) {
      this.setState({ message: 'Please fill in all fields', messageType: MessageBarType.error });
      return;
    }

    try {
      await this.sp.web.lists.getByTitle('Suggestion&Feedback').items.add({
        Title: title,
        Feedback: feedback,
        Category: category,
        Rating: rating
      });

      this.setState({
        title: '',
        feedback: '',
        category: '',
        rating: '',
        message: 'Feedback submitted successfully!',
        messageType: MessageBarType.success
      });
    } catch (error) {
      console.error(error);
      this.setState({ message: 'Error submitting feedback', messageType: MessageBarType.error });
    }
  }

  public render(): React.ReactElement<ISuggestionpartProps> {
    const { title, feedback, category, rating, message, messageType } = this.state;

    return (
      <section className={styles.suggestionPart}>
        {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}

        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={this.handleInputChange}
          required
        />

        <TextField
          label="Feedback"
          name="feedback"
          multiline
          rows={4}
          value={feedback}
          onChange={this.handleInputChange}
          required
        />

        <Dropdown
          label="Category"
          selectedKey={category}
          options={this.categoryOptions}
          onChange={(e, option) => this.handleDropdownChange('category', option)}
          required
        />

        <Dropdown
          label="Rating"
          selectedKey={rating}
          options={this.ratingOptions}
          onChange={(e, option) => this.handleDropdownChange('rating', option)}
          required
        />

        <PrimaryButton text="Submit Feedback" onClick={this.handleSubmit} style={{ marginTop: '10px' }} />
      </section>
    );
  }
}
