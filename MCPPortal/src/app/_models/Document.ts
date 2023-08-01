/**
 * Represents a file.
 */
export class Document {
  id: number;
  guid: string;
  name: string;
  displayName: string;
  description: string;
  timestamp: string;
  extension: string;
  size: string;
  uploadedBy: string;
  type: string;
  content: string;
  toPdf: boolean;
  url: string;
  isPhotoSheet: boolean;
  sequence: number;
  isKeyDocument: boolean;

}

