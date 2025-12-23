import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'AirportserviceWebPartStrings';
import Airportservice from './components/Airportservice';
import { IAirportserviceProps } from './components/IAirportserviceProps';

export interface IAirportserviceWebPartProps {
  description: string;
}

export default class AirportserviceWebPart extends BaseClientSideWebPart<IAirportserviceWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IAirportserviceProps> = React.createElement(
      Airportservice,
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
