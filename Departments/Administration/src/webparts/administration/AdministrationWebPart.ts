import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'AdministrationWebPartStrings';
import Administration from './components/Administration';
import { IAdministrationProps } from './components/IAdministrationProps';

export interface IAdministrationWebPartProps {
  description: string;
}

export default class AdministrationWebPart extends BaseClientSideWebPart<IAdministrationWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IAdministrationProps> = React.createElement(
      Administration,
      {
        description: this.properties.description,   // Pass props to React component
        context: this.context                       // If needed by component
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
