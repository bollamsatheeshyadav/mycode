import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'ImagesdisplayWebPartStrings';
import Imagesdisplay from './components/Imagesdisplay';
import { IImagesdisplayProps } from './components/IImagesdisplayProps';

export interface IImagesdisplayWebPartProps {
  description: string;
}

export default class ImagesdisplayWebPart extends BaseClientSideWebPart<IImagesdisplayWebPartProps> {


public render(): void {
  const element: React.ReactElement<IImagesdisplayProps> = React.createElement(
    Imagesdisplay,
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
