import {Guid} from 'guid-typescript';

/**
 * Represents a SharePoint document.
 */
export class SPDocument {
  Id: number;
  guid: Guid;
  name: string;
  displayName: string;
  description: string;
  timestamp: Date;
  extension: string;
  size: number;
  uploadedBy: string;
  type: string;
  content: string;
  toPdf: boolean;
  url: string;
}
