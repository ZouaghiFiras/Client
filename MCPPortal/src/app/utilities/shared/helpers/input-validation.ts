export class InputValidation {

  public static adjustKendoDate(date: Date) {
    if (date == null || (date as any) === '') {
      return null;
    }
    const d = new Date(date);
    return (date != null) ? new Date(d.getTime() - d.getTimezoneOffset() * 60000) : null;
  }
}
