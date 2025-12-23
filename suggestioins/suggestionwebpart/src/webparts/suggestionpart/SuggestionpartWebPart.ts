import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SuggestionpartWebPartStrings';
import Suggestionpart from './components/Suggestionpart';
import { ISuggestionpartProps } from './components/ISuggestionpartProps';

export interface ISuggestionpartWebPartProps {
  description: string;
}

export default class SuggestionpartWebPart extends BaseClientSideWebPart<ISuggestionpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISuggestionpartProps> = React.createElement(
      Suggestionpart,
      {
        context: this.context // Pass the SPFx context to your React component
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
