import * as React from 'react';
import styles from './Feedbackform.module.scss';
import type { IFeedbackformProps } from './IFeedbackformProps';

import {
  TextField,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  IconButton
} from '@fluentui/react';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IFeedbackformState {
  open: boolean;
  subject: string;
  feedback: string;
  category?: string;
  rating?: string;
  success: boolean;
  errors: {
    subject?: string;
    feedback?: string;
    category?: string;
    rating?: string;
  };
}

export default class Feedbackform extends React.Component<IFeedbackformProps, IFeedbackformState> {

  private sp = spfi().using(SPFx(this.props.context));

  constructor(props: IFeedbackformProps) {
    super(props);
    this.state = {
      open: false,
      subject: '',
      feedback: '',
      category: undefined,
      rating: undefined,
      success: false,
      errors: {}
    };
  }

  private categoryOptions: IDropdownOption[] = [
    { key: 'Suggestion', text: 'Suggestion' },
    { key: 'Issue', text: 'Issue' },
    { key: 'Appreciation', text: 'Appreciation' }
  ];


  // Validate fields
  private validateFields = (): boolean => {
    const errors: any = {};
    let valid = true;
    if (!this.state.subject.trim()) { errors.subject = "Subject is required"; valid = false; }
    if (!this.state.feedback.trim()) { errors.feedback = "Feedback is required"; valid = false; }
    if (!this.state.category) { errors.category = "Category is required"; valid = false; }
    if (!this.state.rating) { errors.rating = "Rating is required"; valid = false; }
    this.setState({ errors });
    return valid;
  };

  private submitFeedback = async (): Promise<void> => {
    if (!this.validateFields()) return;

    try {
      await this.sp.web.lists
        .getByTitle("Suggestion&Feedback")
        .items.add({
          Title: this.state.subject,
          Feedback: this.state.feedback,
          Category: this.state.category,
          Rating: this.state.rating
        });

      this.setState({
        success: true,
        subject: '',
        feedback: '',
        category: undefined,
        rating: undefined,
        errors: {}
      });

      setTimeout(() => {
        this.setState({ open: false, success: false });
      }, 2500);

    } catch (err) {
      console.error("Feedback submit error", err);
    }
  };

  public render(): React.ReactElement<IFeedbackformProps> {
    return (
      <section className={styles.feedbackForm}>

        {/* Floating Feedback Icon with animation */}
        <IconButton
          iconProps={{ iconName: 'Feedback' }}
          className={styles.floatingBtn}
          onClick={() => this.setState({ open: true })}
        />

        {/* Slide-out Panel */}
        <Panel
          isOpen={this.state.open}
          onDismiss={() => this.setState({ open: false })}
          type={PanelType.medium}
          headerText="Share Your Feedback"
          isLightDismiss
          isBlocking={false}
        >

          {/* Success Message */}
          {this.state.success && (
            <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
              Thank you! Your feedback has been submitted.
            </MessageBar>
          )}

          {/* Input Fields with colored background */}
  <TextField
  label="Subject"
  value={this.state.subject}
  onChange={(_, v) => this.setState({ subject: v || '' })}
  errorMessage={this.state.errors.subject}
  required
  className={styles.inputField}
/>

<Dropdown
  label="Category"
  options={this.categoryOptions}
  selectedKey={this.state.category}
  onChange={(_, o) => this.setState({ category: o?.key as string })}
  errorMessage={this.state.errors.category}
  required
  className={styles.dropdownField}
/>

<TextField
  label="Feedback"
  value={this.state.feedback}
  onChange={(_, v) => this.setState({ feedback: v || '' })}
  errorMessage={this.state.errors.feedback}
  multiline
  rows={4}
  required
  className={styles.inputField}
/>

<Dropdown
  label="Rating"
  options={[
    { key: '1', text: '1 - Poor' },
    { key: '2', text: '2 - Fair' },
    { key: '3', text: '3 - Good' },
    { key: '4', text: '4 - Very Good' },
    { key: '5', text: '5 - Excellent' }
  ]}
  selectedKey={this.state.rating}
  onChange={(_, o) => this.setState({ rating: o?.key as string })}
  errorMessage={this.state.errors.rating}
  required
  className={styles.dropdownField}
/>

<PrimaryButton
  text="Submit"
  onClick={this.submitFeedback}
  className={styles.submitBtn}
/>


        </Panel>
      </section>
    );
  }
}
