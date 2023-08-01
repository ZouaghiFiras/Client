export class EmployeeAuthorizations {
  intake: EmployeeOperations;
  summary: EmployeeOperations;
  dossierData: EmployeeOperations;
  planning: EmployeeOperations;
  reporting: EmployeeOperations;
  history: EmployeeOperations;
  settings: EmployeeOperations;
  qualityControl: EmployeeOperations;

  constructor(roles: string) {
    const userRoles = JSON.parse(roles);
    Object.keys(userRoles).forEach(key => {
      if (key === 'Intake') {
        this.intake = userRoles[key];
      }
      if (key === 'Summary(DossierHandling)') {
        this.summary = userRoles[key];
      }
      if (key === 'DossierData(DossierHandling)') {
        this.dossierData = userRoles[key];
      }
      if (key === 'Planning(DossierHandling)') {
        this.planning = userRoles[key];
      }
      if (key === 'Reporting(DossierHandling)') {
        this.reporting = userRoles[key];
      }
      if (key === 'History(DossierHandling)') {
        this.history = userRoles[key];
      }
      if (key === 'Settings') {
        this.settings = userRoles[key];
      }
      if (key === 'QualityControl') {
        this.qualityControl = userRoles[key];
      }
    });
  }
}

export class EmployeeOperations {
  OperationCreate: boolean;
  OperationDelete: boolean;
  OperationExecute: boolean;
  OperationRead: boolean;
  OperationUpdate: boolean;
}
