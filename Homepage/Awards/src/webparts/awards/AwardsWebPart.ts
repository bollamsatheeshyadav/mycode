import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import Awards from "./components/Awards";
import { IAwardsProps } from "./components/IAwardsProps";

export interface IAwardsWebPartProps {}

export default class AwardsWebPart extends BaseClientSideWebPart<IAwardsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IAwardsProps> = React.createElement(
      Awards,
      {
        context: this.context // Pass SPFx context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
