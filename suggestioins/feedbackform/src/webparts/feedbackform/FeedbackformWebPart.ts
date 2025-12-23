import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FeedbackformWebPartStrings';
import Feedbackform from './components/Feedbackform';
import { IFeedbackformProps } from './components/IFeedbackformProps';

export interface IFeedbackformWebPartProps {
  description: string;
}

export default class FeedbackformWebPart extends BaseClientSideWebPart<IFeedbackformWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IFeedbackformProps> = React.createElement(
      Feedbackform,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // 🔹 Property pane is OPTIONAL – not required for feedback form
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
