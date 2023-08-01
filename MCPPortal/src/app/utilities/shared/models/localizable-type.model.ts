export class LocalizableType {
  lltId: string;
  lltCode: string;
  lltShortName: string;
  lltLongName: string;
  lltInactive: boolean;

  constructor(name: string) {
    this.lltCode = name.substr(0, 10);
    this.lltShortName = name.substr(0, 20);
    this.lltLongName = name.substr(0, 250);
    this.lltInactive = false;
  }
}
