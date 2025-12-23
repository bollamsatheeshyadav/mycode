import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewempdataWebPartStrings';
import Newempdata from './components/Newempdata';
import { INewempdataProps } from './components/INewempdataProps';

export interface INewempdataWebPartProps {
  description: string;
}

export default class NewempdataWebPart extends BaseClientSideWebPart<INewempdataWebPartProps> {

  public render(): void {

    const element: React.ReactElement<INewempdataProps> = React.createElement(
      Newempdata,
      {
        context: this.context,          // ✅ REQUIRED
        description: this.properties.description // optional
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
