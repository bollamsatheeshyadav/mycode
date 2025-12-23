import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISuggestionpartProps {
  description?: string;       // Optional, you can use it if needed
  context: WebPartContext;    // Required for PnPjs and SharePoint operations
}
