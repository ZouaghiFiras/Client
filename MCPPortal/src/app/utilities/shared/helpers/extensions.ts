import {v4 as uuidv4} from 'uuid';

export class Extensions {

  public static isStringNullOrEmpty(str: string) {
    return !str || str == null || str === '';
  }

  public static isArrayNullOrEmpty<T>(tab: T[]) {
    return !tab || tab == null || tab.length === 0;
  }

  public static isNull(obj: any) {
    return obj == undefined || obj == null;
  }

  public static isEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  public static isGuidNullOrEmpty(str: string) {
    return !str || str == null || str === '' || str === '00000000-0000-0000-0000-000000000000';
  }

  public static areDatesEqual(date1: Date, date2: Date) {
    date1 = new Date(date1);
    date2 = new Date(date2);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
  }

  public static getDate(date: Date) {
    if (Extensions.isNull(date)) {
      return null;
    }
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static getDateTime(date: Date) {
    if (Extensions.isNull(date)) {
      return null;
    }
    date = new Date(date);
    return date;
  }

  public static getTodayDate() {
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    return minDate;
  }

  public static getValueStringOrDefault(str: string) {
    return str != null ? str : '';
  }

  public static NewGuid() {
    return uuidv4() as string;
  }
}
