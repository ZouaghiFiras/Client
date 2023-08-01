export class User {
  tid: number;
  name: string;
  given_name: string;
  family_name: string;
  unique_name: string;
  ipaddr: string;
  token?: string;
  entrysystem: string;
  role?: string;

  /**
   * The constructor
   */
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
