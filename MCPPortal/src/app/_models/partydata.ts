/**
 * Represents party data associated with an assignment.
 */
export class PartyData {
  partyType: string;
  partyName: string;
  partyAddress: string;

  /**
   * Creates a new PartyData instance.
   * @param partyType - The type of the party.
   * @param partyName - The name of the party.
   * @param partyAddress - The address of the party.
   */
  constructor(partyType: string, partyName: string, partyAddress: string) {
    this.partyType = partyType;
    this.partyName = partyName;
    this.partyAddress = partyAddress;
  }
}
