import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, forkJoin, from, Observable, throwError} from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import {AuthService} from './auth.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProspectApiService {
  private readonly baseUrl = 'https://mdmapiprospect-t.azurewebsites.net';
  private readonly frontOfficeUrl = 'https://frontofficeapiprospect-t.azurewebsites.net';
  private readonly pdcApiUrl = 'https://pdcapiprospect-t.azurewebsites.net';
  private readonly intakeApiUrl = 'https://wa-intakeapi-t.azurewebsites.net/';
  private readonly waQuestionnaireApiUrl = 'https://wa-questionairapi-t.azurewebsites.net';
  private readonly advicePortalUrl = 'https://adviceportalprospect-t.azurewebsites.net';
  private readonly dossierApiUrl = 'https://dossierapiprospect-t.azurewebsites.net';
  private readonly commonApiUrl = 'https://commonapiprospect-t.azurewebsites.net';
  private readonly dmsServiceUrl = 'https://dmsserviceprospect-t.azurewebsites.net';

  private currentDate = new Date();
  private currentLanguage = this.languageService.currentLang ?
    this.languageService.currentLang : this.languageService.getBrowserCultureLang();
  private reporterSelectionData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private reportersWayOfContactData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private productMainActivityData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private productCoverageData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private productObjectData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private productSubObjectData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private damageMainReasonData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private damageReasonData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private damageSubReasonData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private damageCauseData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private additionalActivityOptionData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private additionalReportingFormData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private additionalDeliverMethodData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService, private languageService: TranslateService) {}

  setReporterSelectionData(newData: any): void {
    this.reporterSelectionData.next(newData);
  }

  getReporterSelectionData(): Observable<any> {
    return this.reporterSelectionData.asObservable();
  }
  setReporterWayOfContactData(newData: any): void {
    this.reportersWayOfContactData.next(newData);
  }

  getReporterWayOfContactData(): Observable<any> {
    return this.reportersWayOfContactData.asObservable();
  }
  setProductMainActivityData(newData: any): void {
    this.productMainActivityData.next(newData);
  }

  getProductMainActivityData(): Observable<any> {
    return this.productMainActivityData.asObservable();
  }
  setProductCoverageData(newData: any): void {
    this.productCoverageData.next(newData);
  }

  getProductCoverageData(): Observable<any> {
    return this.productCoverageData.asObservable();
  }
  setProductObjectData(newData: any): void {
    this.productObjectData.next(newData);
  }

  getProductObjectData(): Observable<any> {
    return this.productObjectData.asObservable();
  }
  setProductSubObjectData(newData: any): void {
    this.productSubObjectData.next(newData);
  }

  getProductSubObjectData(): Observable<any> {
    return this.productSubObjectData.asObservable();
  }
  setDamageMainReasonData(newData: any): void {
    this.damageMainReasonData.next(newData);
  }

  getDamageMainReasonData(): Observable<any> {
    return this.damageMainReasonData.asObservable();
  }
  setDamageReasonData(newData: any): void {
    this.damageReasonData.next(newData);
  }

  getDamageReasonData(): Observable<any> {
    return this.damageReasonData.asObservable();
  }
  setDamageSubReasonData(newData: any): void {
    this.damageSubReasonData.next(newData);
  }

  getDamageSubReasonData(): Observable<any> {
    return this.damageSubReasonData.asObservable();
  }
  setDamageCauseData(newData: any): void {
    this.damageCauseData.next(newData);
  }

  getDamageCauseData(): Observable<any> {
    return this.damageCauseData.asObservable();
  }
  setAdditionalActivityOptionData(newData: any): void {
    this.additionalActivityOptionData.next(newData);
  }

  getAdditionalActivityOptionData(): Observable<any> {
    return this.additionalActivityOptionData.asObservable();
  }
  setAdditionalReportingFormData(newData: any): void {
    this.additionalReportingFormData.next(newData);
  }

  getAdditionalReportingFormData(): Observable<any> {
    return this.additionalReportingFormData.asObservable();
  }
  setAdditionalDeliveryMethodData(newData: any): void {
    this.additionalReportingFormData.next(newData);
  }

  getAdditionalDeliveryMethodData(): Observable<any> {
    return this.additionalReportingFormData.asObservable();
  }

  getProspectToken(): Observable<string> {
    const url = 'https://localhost:7023/SharePointApi/Token';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string>(url, {headers});
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching prospect token:', error);
        return throwError(error);
      })
    );
  }

  private getRequestOptions(): Observable<HttpHeaders> {
    return this.getProspectToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json; charset=utf-8')
          .set('Authorization', `Bearer ${token}`);
        return new Observable<HttpHeaders>((observer) => {
          observer.next(headers);
          observer.complete();
        });
      })
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = error.error.message;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private getRequestWithHeaders(url: string): Observable<any> {
    return this.getRequestOptions().pipe(
      switchMap((headers) => {
        return this.http.get<any>(url, { headers }).pipe(catchError(this.handleError));
      })
    );
  }

  private postRequestWithHeaders(url: string, body: any): Observable<any> {
    return this.getRequestOptions().pipe(
      switchMap((headers) => {
        return this.http.post<any>(url, body, { headers }).pipe(catchError(this.handleError));
      })
    );
  }

  getReportersList(): Observable<any> {
    const url = `${this.baseUrl}/commonReporters`;
    return this.getRequestWithHeaders(url);
  }

  postClientDetermination(reporterId: string): Observable<any> {
    const body = {
      reporterId,
      reportingForId: '',
      thirdPartyId: '',
    };
    const url = `${this.baseUrl}/api/ClientDetermination`;
    this.setReporterSelectionData(body);
    console.log(body.reporterId);
    return this.postRequestWithHeaders(url, body);
  }

  getSalutation(): Observable<any> {
    const url = `${this.baseUrl}/odata/Salutation`;
    return this.getRequestWithHeaders(url);
  }

  getContactMethods(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/IM/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }

  getProductSelectionIcons(): Observable<any> {
    const url = 'assets/productSelectionIcons.json';
    return this.http.get<any>(url);
  }

  getIntakeMainActivities(): Observable<any> {
    let clientId = null;
    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    const body = {
      productSelectionList: [
        {
          clientId,
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [],
          selectedReasons: [],
          selectedReportingForms: [],
          selectedActivityOptions: [],
          selectedMainActivity: '',
        },
      ],
    };
    const url = `${this.intakeApiUrl}/Selection/IntakeMainActivities?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);
  }

  loadActivityNamesAndIcons(): Observable<{ name: string; icon: string , id: string}[]> {
    return this.getIntakeMainActivities().pipe(
      switchMap((data) => {
        return this.getProductSelectionIcons().pipe(
          map((icons) => {
            return data.workActivities.map((activity: any) => {
              const icon = icons.find((i: any) => i.key === activity.code)?.value;
              return { name: activity.name, icon, id: activity.id };
            });
          })
        );
      })
    );
  }

  getIntakeCoverages(): Observable<any> {
    let clientId = null;
    let selectedMainActivity = null;
    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    const body = {
      productSelectionList: [
        { selectedMainActivity,
          clientId,
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [],
          selectedReasons: [],
          selectedReportingForms: [],
          selectedActivityOptions: []
        }
      ]
    };
    const url = `${this.intakeApiUrl}/Selection/IntakeCoverages?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);
  }

  loadCoverageNamesAndIcons(): Observable<{ name: string, icon: string , id: string, code: string}[]> {
    return this.getIntakeCoverages().pipe(
      switchMap(data => {
        return this.getProductSelectionIcons().pipe(
          map(icons => {
            return data.insuranceCoverages.map(coverage => {
              const icon = icons.find(i => i.key === coverage.code)?.value;
              return { name: coverage.name, icon , id: coverage.id , code: coverage.code };
            });
          })
        );
      })
    );
  }
  getIntakeObjects(): Observable<any> {
    let clientId = null;
    let selectedMainActivity = null;
    let selectedCoverage = null;
    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    this.getProductCoverageData().subscribe((data) => {
      selectedCoverage = data;
    });
    const body = {
      productSelectionList: [
        {
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage.coverageId
          ],
          selectedReasons: [],
          selectedActivityOptions: [],
          selectedReportingForms: [],
          selectedMainActivity,
          clientId
        }
      ]
    };
    const url = `${this.intakeApiUrl}/Selection/IntakeObjects/?language=${this.currentLanguage}&productType=null'`;
    return this.postRequestWithHeaders(url, body);
  }

  loadObjectNamesAndIcons(): Observable<{ name: string, icon: string , id: string}[]> {
    return this.getIntakeObjects().pipe(
      switchMap(data => {
        return this.getProductSelectionIcons().pipe(
          map(icons => {
            return data.insuranceObjects.map(object => {
              const icon = icons.find(i => i.key === object.code)?.value;
              return { name: object.name, icon , id: object.id };
            });
          })
        );
      })
    );
  }
  loadSubObjectNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
    return this.getProductObjectData().pipe(
      switchMap(selectedObjectId => {
        return forkJoin({
          intakeObjects: this.getIntakeObjects(),
          selectionIcons: this.getProductSelectionIcons()
        }).pipe(
          map(({ intakeObjects, selectionIcons }) => {
            const selectedObject = intakeObjects.insuranceObjects.find(object => object.id === selectedObjectId);
            if (!selectedObject) {
              return [];
            }
            return selectedObject.children.map(child => {
              const icon = selectionIcons.find(i => i.key === child.code)?.value;
              return { name: child.name, icon, id: child.id };
            });
          })
        );
      })
    );
  }



  getRoleCodes(): Observable<any> {
    const url = `${this.intakeApiUrl}GetRoleCodes`;
    return this.getRequestWithHeaders(url);
  }

  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/odata/Country?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }

  getConditionList(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/L1/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }
  getBuildingUseList(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/L2/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }
  getActivityOptionsList(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/L3/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }
  getIntakeSubCoverages(): Observable<any> {
    let clientId = null;
    let selectedMainActivity = null;
    let selectedMainObject = null;
    let selectedObject = null;
    let selectedCoverage = null;
    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    this.getProductObjectData().subscribe((data) => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe((data) => {
      selectedObject = data;
    });
    this.getProductCoverageData().subscribe((data) => {
      selectedCoverage = data;
    });

    const body = {
      productSelectionList: [
        {
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage.coverageId
          ],
          selectedReasons: [],
          selectedActivityOptions: [],
          selectedReportingForms: [],
          clientId,
          selectedMainActivity,
          selectedMainObject,
          selectedObject
        }
      ]
    };
    const url = `${this.intakeApiUrl}/Selection/IntakeSubCoverages/?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);

  }
  getPolicyDuration(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/PD/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }

  getIntakeDamageReasons(): Observable<any> {
    let clientId = null;
    let selectedMainActivity = null;
    let selectedMainObject = null;
    let selectedObject = null;
    let selectedCoverage = null;
    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    this.getProductObjectData().subscribe((data) => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe((data) => {
      selectedObject = data;
    });
    this.getProductCoverageData().subscribe((data) => {
      selectedCoverage = data;
    });

    const body = {
      productSelectionList: [
        {

          assingmentCreationDate: this.currentDate.toISOString(),
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage.coverageId
          ],
          selectedReasons: [],
          selectedActivityOptions: [],
          selectedReportingForms: [],
          clientId,
          selectedMainActivity,
          selectedMainObject,
          selectedObject
        },

      ]
    };
    const url = `${this.intakeApiUrl}/Selection/IntakeDamageReasons/?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);

  }



  loadDamageMainReasonsNamesAndIcons(): Observable<{ name: string, icon: string , id: string}[]> {
    return this.getIntakeDamageReasons().pipe(
      switchMap(data => {
        return this.getDamageInformationsIcons().pipe(
          map(icons => {
            return data.damageReasons.map(reason => {
              const icon = icons.find(i => i.code === reason.code)?.icon;
              return { name: reason.name, icon , id: reason.id };
            });
          })
        );
      })
    );
  }

  getDamageInformationsIcons(): Observable<any> {
    const url = 'assets/damageInformationsIcons.json';
    return this.http.get<any>(url);
  }
  loadDamageReasonsNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
    return this.getDamageMainReasonData().pipe(
      switchMap(selectedMainReasonId => {
        return forkJoin({
          intakeDamageReasons: this.getIntakeDamageReasons(),
          selectionIcons: this.getDamageInformationsIcons()
        }).pipe(
          map(({ intakeDamageReasons, selectionIcons }) => {
            const selectedMainReason = intakeDamageReasons.damageReasons.find(reason => reason.id === selectedMainReasonId);
            if (!selectedMainReason) {
              return [];
            }
            return selectedMainReason.children.map(child => {
              const icon = selectionIcons.find(i => i.code === child.code)?.icon;
              return { name: child.name, icon, id: child.id };
            });
          })
        );
      })
    );
  }

  loadDamageSubReasonsNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
    return this.getDamageReasonData().pipe(
      switchMap(selectedReasonId => {
        return forkJoin({
          intakeDamageReasons: this.getIntakeDamageReasons(),
          selectionIcons: this.getDamageInformationsIcons()
        }).pipe(
          map(({ intakeDamageReasons, selectionIcons }) => {
            const selectedMainReason = intakeDamageReasons.damageReasons.
            find(mainReason => mainReason.children.some(reason => reason.id === selectedReasonId));
            if (!selectedMainReason) {
              return [];
            }
            const selectedReason = selectedMainReason.children.find(reason => reason.id === selectedReasonId);
            if (!selectedReason) {
              return [];
            }
            return selectedReason.children.map(child => {
              const icon = selectionIcons.find(i => i.code === child.code)?.icon;
              return { name: child.name, icon, id: child.id };
            });
          })
        );
      })
    );
  }
  determineDamageCause(): Observable<any> {
    let selectedMainReason = null;
    let selectedReason = null;
    let selectedSubReason = null;

    this.getDamageMainReasonData().subscribe((data) => {
      selectedMainReason = data;
    });

    this.getDamageReasonData().subscribe((data) => {
      selectedReason = data;
    });

    this.getDamageSubReasonData().subscribe((data) => {
      selectedSubReason = data;
    });
    const url = `${this.pdcApiUrl}/DamageReason/determinateCause?language=${this.currentLanguage}&mainReason=${selectedMainReason}&reason=${selectedReason}&subReason=${selectedSubReason}`;
    return this.getRequestWithHeaders(url);
  }
  loadDamageCauseNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
    return this.determineDamageCause().pipe(
      switchMap(data => {
        if (!Array.isArray(data)) {
          data = [data]; // Convert to array if not already an array
        }

        return this.getDamageInformationsIcons().pipe(
          map(icons => {
            const iconMap = new Map<string, string>(icons.map(icon => [icon.code, icon.icon])); // Create a map for faster lookup

            return data.map(cause => {
              const icon = iconMap.get(cause.code) || ''; // Get the icon from the map
              return { name: cause.name, icon, id: cause.id };
            });
          })
        );
      })
    );
  }
  getQuestionnairePerProduct(): Observable<any> {
    let selectedMainActivity = null;
    let selectedCoverage = null;
    let selectedDamageReason = null;
    let selectedWayOfContact = null;
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    this.getDamageCauseData().subscribe((data) => {
      selectedDamageReason = data;
    });
    this.getProductCoverageData().subscribe((data) => {
      selectedCoverage = data;
    });
    this.getReporterWayOfContactData().subscribe((data) => {
      selectedWayOfContact = data;
    });

    const body = {
      productSelection: [
        {
          key: 'WorkActivity',
          value: selectedMainActivity
        },
        {
          key: 'Coverage',
          value: selectedCoverage,
          priority: 1
        },
        {
          key: 'DamageReason',
          value: selectedDamageReason,
          priority: 1
        }
      ],
      intakeMethod: selectedWayOfContact
    };
    console.log(body);
    const url = `${this.waQuestionnaireApiUrl}/questionnaireApi/getQuestionnairePerProduct?startDate=${this.currentDate.toISOString()}?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);
  }

  getIntakeTriggeredActivitiesByQuestions(): Observable<any> {
    let clientId = null;
    let selectedMainActivity = null;
    let selectedCoverage = null;
    let selectedMainObject = null;
    let selectedObject = null;
    let selectedReason = null;
    let selectedSubReason = null;

    this.getReporterSelectionData().subscribe((data) => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe((data) => {
      selectedMainActivity = data;
    });
    this.getProductObjectData().subscribe((data) => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe((data) => {
      selectedObject = data;
    });

    this.getDamageReasonData().subscribe((data) => {
      selectedReason = data;
    });

    this.getDamageSubReasonData().subscribe((data) => {
      selectedSubReason = data;
    });
    this.getProductCoverageData().subscribe((data) => {
      selectedCoverage = data;
    });
    const productType = selectedMainActivity.match(/\b([A-Z][a-z]*)(?=[A-Z])/)[0];
    const body = {
      selections: [
        {
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage
          ],
          selectedReasons: [
            selectedReason
          ],
          selectedActivityOptions: [],
          selectedReportingForms: [],
          selectedMainActivity: '84dd1bc2-7113-4edb-b22c-f7543caa8b4e',
          assingmentCreationDate: this.currentDate.toISOString(),
          clientId,
          selectedMainObject,
          selectedObject,
          involvedObjectId: selectedObject
        }
      ],
      activities: []
    };
    console.log(body);
    const url = `${this.waQuestionnaireApiUrl}/Selection/IntakeTriggeredActivitiesByQuestions?language=${this.currentLanguage}&productType=${productType}`;
    return this.postRequestWithHeaders(url, body);
  }
  getAllOptionsForActivityExecution(): Observable<any> {
    const url = `${this.frontOfficeUrl}/IntakeTiles/GetAllOptions/Activity%20Execution`;
    return this.getRequestWithHeaders(url);
  }
  getAllOptionsForReportingForm(): Observable<any> {
    const url = `${this.frontOfficeUrl}/IntakeTiles/GetAllOptions/Reporting%20Form`;
    return this.getRequestWithHeaders(url);
  }
  getAdditionalQuestionsIcons(): Observable<any> {
    const url = 'assets/additionalQuestionsIcons.json';
    return this.http.get<any>(url);
  }
  loadTriggeredActivitiesNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
    return this.getIntakeTriggeredActivitiesByQuestions().pipe(
      switchMap(data => {
        if (!Array.isArray(data)) {
          data = [data]; // Convert to array if not already an array
        }

        return this.getAdditionalQuestionsIcons().pipe(
          map(icons => {
            const iconMap = new Map<string, string>(icons.map(icon => [icon.code, icon.icon])); // Create a map for faster lookup

            return data.map(activity => {
              const icon = iconMap.get(activity.code) || ''; // Get the icon from the map
              return { name: activity.name, icon, id: activity.id };
            });
          })
        );
      })
    );
  }
  loadIntakeActivityExecutionNamesAndIcons(): Observable<{ name: string, icon: string, id: string }[]> {
      return this.getIntakeActivityExecutions().pipe(
        switchMap((data) => {
          return this.getAdditionalQuestionsIcons().pipe(
            map((icons) => {
              console.log(data);
              return data.activityExecutions.map((ae: any) => {
                const icon = icons.find((i: any) => i.key === ae.code)?.value;
                return { name: ae.name, icon, id: ae.id };
              });
            })
          );
        })
      );
  }

  getIntakeActivityExecutions(): Observable<any> {
    let selectedCoverage = null;
    let selectedObject = null;
    let selectedMainObject = null;
    let clientId = null;
    let selectedMainActivity = null;
    let selectedReasons = null;
    this.getProductCoverageData().subscribe(data => {
      selectedCoverage = data;
    });
    this.getProductObjectData().subscribe(data => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe(data => {
      selectedObject = data;
    });
    this.getReporterSelectionData().subscribe(data => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe(data => {
      selectedMainActivity = data;
    });
    this.getDamageCauseData().subscribe(data => {
      selectedReasons = data;
    });
    const body = {
      productSelectionList: [
        {
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage
          ],
          selectedReasons: [
            selectedReasons
          ],
          selectedActivityOptions: [],
          selectedReportingForms: [],
          selectedMainActivity,
          assingmentCreationDate: this.currentDate.toISOString(),
          clientId,
          selectedMainObject,
          selectedObject
        }
      ]
    };
    console.log(body);
    const url = `${this.intakeApiUrl}/Selection/IntakeActivityExecutions?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);
  }
  getIntakeReportingForms(): Observable<any> {
    const url = `${this.intakeApiUrl}/Selection/IntakeReportingForms/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }
  loadReportingFormNamesAndIcons(): Observable<{ name: string; icon: string , id: string}[]> {
    return this.getIntakeReportingForms().pipe(
      switchMap((data) => {
        return this.getAdditionalQuestionsIcons().pipe(
          map((icons) => {
            return data.reportingForms.map((rf: any) => {
              const icon = icons.find((i: any) => i.key === rf.code)?.value;
              return { name: rf.name, icon, id: rf.id };
            });
          })
        );
      })
    );
  }
  getDeliveryMethods(): Observable<any> {
    let selectedCoverage = null;
    let selectedObject = null;
    let selectedMainObject = null;
    let clientId = null;
    let selectedMainActivity = null;
    let selectedReportingForm = null;
    let selectedActivityOption = null;
    let selectedReasons = null;
    this.getProductCoverageData().subscribe(data => {
      selectedCoverage = data;
    });
    this.getProductObjectData().subscribe(data => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe(data => {
      selectedObject = data;
    });
    this.getReporterSelectionData().subscribe(data => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe(data => {
      selectedMainActivity = data;
    });
    this.getDamageReasonData().subscribe(data => {
      selectedReasons = data;
    });
    this.getAdditionalActivityOptionData().subscribe(data => {
      selectedActivityOption = data;
    });
    this.getAdditionalReportingFormData().subscribe(data => {
      selectedReportingForm = data;
    });
    const body = {
      productSelectionList: [
        {
          identifiedProducts: [],
          selectedSubWorkActivities: [],
          selectedCoverages: [
            selectedCoverage
          ],
          selectedReasons: [
            selectedReasons
          ],
          selectedActivityOptions: [
            selectedActivityOption
          ],
          selectedReportingForms: [
            selectedReportingForm
          ],
          selectedMainActivity,
          assingmentCreationDate: this.currentDate.toISOString(),
          clientId,
          selectedMainObject,
          selectedObject
        }
      ]
    };
    const url = `${this.intakeApiUrl}/Selection/DeliveryMethods?language=${this.currentLanguage}`;
    return this.postRequestWithHeaders(url, body);
  }
  getDeliveryMethodsIcons(): Observable<any> {
    const url = 'assets/deliveryMethodsIcons.json';
    return this.http.get<any>(url);
  }

  loadDeliveryMethodsNamesAndIcons(): Observable<{ name: string; icon: string , id: string}[]> {
    return this.getDeliveryMethods().pipe(
      switchMap((data) => {
        return this.getDeliveryMethodsIcons().pipe(
          map((icons) => {
            return data.value.map((method: any) => {
              const icon = icons.find((i: any) => i.key === method.code)?.value;
              return { name: method.name, icon, id: method.id };
            });
          })
        );
      })
    );
  }
  getDocumentTypes(): Observable<any> {
    const url = `${this.dmsServiceUrl}/Document/Types`;
    return this.getRequestWithHeaders(url);
  }
  // getDocument(): Observable<any> {
  //   const url = `${this.dossierApiUrl}/Document/`;
  //   return this.getRequestWithHeaders(url);
  // }
  getDocuments(assignmentId: string): Observable<any> {
    const url = `${this.dossierApiUrl}/Document/${assignmentId}`;
    return this.getRequestWithHeaders(url);
  }
  getDocument(fileName: string): Observable<any> {
    const url = `${this.dmsServiceUrl}/Document/Download?fileName=${fileName}`;
    return this.getRequestWithHeaders(url);
  }
  saveDossier(): Observable<any> {
    let selectedDeliveryMethod = null;
    let selectedCoverage = null;
    let selectedObject = null;
    let selectedMainObject = null;
    let clientId = null;
    let selectedMainActivity = null;
    let selectedReportingForm = null;
    let selectedActivityOption = null;
    let selectedReasons = null;
    this.getProductCoverageData().subscribe(data => {
      selectedCoverage = data;
    });
    this.getProductObjectData().subscribe(data => {
      selectedMainObject = data;
    });
    this.getProductSubObjectData().subscribe(data => {
      selectedObject = data;
    });
    this.getReporterSelectionData().subscribe(data => {
      clientId = data;
    });
    this.getProductMainActivityData().subscribe(data => {
      selectedMainActivity = data;
    });
    this.getDamageReasonData().subscribe(data => {
      selectedReasons = data;
    });
    this.getAdditionalActivityOptionData().subscribe(data => {
      selectedActivityOption = data;
    });
    this.getAdditionalReportingFormData().subscribe(data => {
      selectedReportingForm = data;
    });
    this.getAdditionalDeliveryMethodData().subscribe(data => {
      selectedDeliveryMethod = data;
    });

    const body = {
      number: '27I230000434',
      client: {
        id: clientId,
        city: null,
        postalCode: null,
        type: 'Insurer',
        name: 'ProsPecT Insurer -  - ',
        imagePath: 'data:image/png;base64,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',
        phoneNumber: '0123456789',
        email: 'test@test.com'
      },
      mainActivities: [
        {
          isMain: true,
          hasChildren: false,
          isDamage: true,
          children: [],
          productId: '00000000-0000-0000-0000-000000000000',
          isInvoiceable: false,
          productIds: [
            '8635a15f-507f-4141-a539-66996b617f42',
            '38329a79-330e-44f2-a28c-9e8d178b7c51',
            'e4483c32-4255-4e36-8dc1-a0bdd78fb106',
            'eae72990-0515-4bfc-9f05-ceaf505dac95'
          ],
          id: selectedMainActivity,
          code: 'TA1164',
          name: 'Damage assesment',
          logo: 'fas fa-calculator',
          isSelected: true
        }
      ],
      mainCoverage: {
        isMain: false,
        hasChildren: false,
        isDamage: null,
        children: [],
        productId: '00000000-0000-0000-0000-000000000000',
        isInvoiceable: false,
        productIds: [],
        id: selectedCoverage,
        code: 'CO1400',
        name: 'Own policy claimant',
        logo: 'fas fa-user',
        isSelected: true
      },
      mainObject: {
        isMain: true,
        hasChildren: true,
        isDamage: null,
        children: [
          {
            isMain: false,
            hasChildren: false,
            isDamage: null,
            children: [],
            productId: '00000000-0000-0000-0000-000000000000',
            isInvoiceable: false,
            productIds: [
              '38329a79-330e-44f2-a28c-9e8d178b7c51'
            ],
            id: selectedObject,
            code: 'OB1532',
            name: 'Inventory'
          },
          {
            isMain: false,
            hasChildren: false,
            isDamage: null,
            children: [],
            productId: '00000000-0000-0000-0000-000000000000',
            isInvoiceable: false,
            productIds: [
              '38329a79-330e-44f2-a28c-9e8d178b7c51'
            ],
            id: 'c80eb552-28ca-4bfb-bc63-50c62d03f2df',
            code: 'OB1533',
            name: 'Goods'
          },
          {
            isMain: false,
            hasChildren: false,
            isDamage: null,
            children: [],
            productId: '00000000-0000-0000-0000-000000000000',
            isInvoiceable: false,
            productIds: [
              'eae72990-0515-4bfc-9f05-ceaf505dac95'
            ],
            id: '296c4cfa-a2d2-4801-9bc2-ce50a1de3f86',
            code: 'OB1521',
            name: 'Contents'
          }
        ],
        productId: '00000000-0000-0000-0000-000000000000',
        isInvoiceable: false,
        productIds: [
          '38329a79-330e-44f2-a28c-9e8d178b7c51',
          'eae72990-0515-4bfc-9f05-ceaf505dac95'
        ],
        id: selectedMainObject,
        code: 'OB1500',
        name: 'Content/inventory/goods',
        logo: 'fas fa-box',
        isSelected: true
      },
      productType: 'damage',
      product: {},
      coverage: {},
      object: {
        isMain: false,
        hasChildren: false,
        isDamage: null,
        children: [],
        productId: '00000000-0000-0000-0000-000000000000',
        isInvoiceable: false,
        productIds: [
          '38329a79-330e-44f2-a28c-9e8d178b7c51'
        ],
        id: '48c4cada-e255-474d-979d-8932f5072e8f',
        code: 'OB1532',
        name: 'Inventory'
      },
      dossierParties: [
        {
          treePartyId: '005bd607-6314-e13c-78c8-55511f10b0cc',
          partyRole: 'Insuree',
          rolCode: 'VE',
          linkedTo: 'None',
          firstName: 'Firas',
          middleName: null,
          lastName: 'Zouaghi',
          dateOfBirth: null,
          salutationId: null,
          country: {
            name: 'Netherlands',
            id: 'NL',
            iso3Code: 'NLD'
          },
          postalCode: null,
          houseNumber: null,
          houseNumberAddition: null,
          street: null,
          city: null,
          email: 'FZOU-Admin@cedcloud.com',
          phoneNumber1: '',
          phoneNumber2: null,
          phoneNumber3: null,
          cocNumber: null,
          reference: null,
          iban: null,
          bic: null,
          dossierObjects: [
            {
              id: '',
              treeObjectId: 'b4e12a32-4327-0e5d-6468-d1bf15cd2c06',
              treePartyId: '005bd607-6314-e13c-78c8-55511f10b0cc',
              mainObject: {
                isMain: true,
                hasChildren: true,
                isDamage: null,
                children: [
                  {
                    isMain: false,
                    hasChildren: false,
                    isDamage: null,
                    children: [],
                    productId: '00000000-0000-0000-0000-000000000000',
                    isInvoiceable: false,
                    productIds: [
                      '38329a79-330e-44f2-a28c-9e8d178b7c51'
                    ],
                    id: '48c4cada-e255-474d-979d-8932f5072e8f',
                    code: 'OB1532',
                    name: 'Inventory'
                  },
                  {
                    isMain: false,
                    hasChildren: false,
                    isDamage: null,
                    children: [],
                    productId: '00000000-0000-0000-0000-000000000000',
                    isInvoiceable: false,
                    productIds: [
                      '38329a79-330e-44f2-a28c-9e8d178b7c51'
                    ],
                    id: 'c80eb552-28ca-4bfb-bc63-50c62d03f2df',
                    code: 'OB1533',
                    name: 'Goods'
                  },
                  {
                    isMain: false,
                    hasChildren: false,
                    isDamage: null,
                    children: [],
                    productId: '00000000-0000-0000-0000-000000000000',
                    isInvoiceable: false,
                    productIds: [
                      'eae72990-0515-4bfc-9f05-ceaf505dac95'
                    ],
                    id: '296c4cfa-a2d2-4801-9bc2-ce50a1de3f86',
                    code: 'OB1521',
                    name: 'Contents'
                  }
                ],
                productId: '00000000-0000-0000-0000-000000000000',
                isInvoiceable: false,
                productIds: [
                  '38329a79-330e-44f2-a28c-9e8d178b7c51',
                  'eae72990-0515-4bfc-9f05-ceaf505dac95'
                ],
                id: selectedMainObject,
                code: 'OB1500',
                name: 'Content/inventory/goods',
                logo: 'fas fa-box',
                isSelected: true
              },
              object: {
                isMain: false,
                hasChildren: false,
                isDamage: null,
                children: [],
                productId: '00000000-0000-0000-0000-000000000000',
                isInvoiceable: false,
                productIds: [
                  '38329a79-330e-44f2-a28c-9e8d178b7c51'
                ],
                id: selectedObject,
                code: 'OB1532',
                name: 'Inventory'
              },
              subObject: null,
              party: 'VE',
              policyNumber: '',
              deductibleExcess: '',
              insuredAmount: '',
              policyConditions: '',
              deedOfAssignment: '',
              guarantee: true,
              vat: null,
              condition: '',
              buildingUse: '',
              constructionYear: '',
              externalMaterials: '',
              roofCovering: '',
              numberOfDamagedObjects: '',
              country: null,
              postalCode: '',
              houseNumber: '',
              houseNumberAddition: '',
              street: '',
              city: '',
              damageLocations: '',
              sameLocation: false,
              insuredAmountHasToBeDetermined: false,
              isMandatory: true,
              coverage: {
                id: '2dc41e59-93cc-4397-b7b7-8a552d1b797b',
                code: 'CO1439',
                name: 'Inventory/goods'
              },
              optionId: '',
              policyStartDate: null
            }
          ],
          isCompany: false,
          companyName: '',
          isHomeOwnerAssociation: null,
          partyOrder: 0
        }
      ],
      damageInformations: {
        mainReason: {
          id: 'c7cb58d0-2c58-435d-98f2-8507b2249b11',
          name: 'Water',
          code: 'DA1686'
        },
        reason: {
          id: 'e2b0ccb2-65eb-4478-85e1-aa1d24fc1c8f',
          name: 'Precipitation',
          code: 'DA1680'
        },
        subReason: {
          id: '',
          name: '',
          code: ''
        },
        cause: {
          id: 'e2b0ccb2-65eb-4478-85e1-aa1d24fc1c8f',
          name: 'Precipitation'
        },
        regresPossible: false,
        damageDateKnown: false,
        dateEstimated: false,
        caseNumber: null,
        totalAmount: null,
        damageDate: null,
        additionalExplanation: null,
        orderNumber: null
      },
      additionalQuestions: {
        questionnairesResult: [
          {
            questionnaireId: 'a66240b7-c7e2-4d1d-9d2c-78c0438c0fb0',
            questionnaireType: 'Intake',
            answers: [
              {
                questionId: '80693581-7902-4b6b-b238-0d9afbd03e9d',
                answerText: '',
                optionId: '1b5f1404-4744-49c0-b926-94ed6fa2d8be',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: ''
              },
              {
                questionId: '16fdfd40-b276-469e-8da2-118366ca365b',
                answerText: '',
                optionId: '1b5f1404-4744-49c0-b926-94ed6fa2d8be',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: ''
              },
              {
                questionId: 'e7916948-02e8-4fff-81b8-54c8c7cc5eff',
                answerText: null,
                optionId: '',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: ''
              },
              {
                questionId: '4fad6655-4360-4c92-ae01-7641330859d5',
                answerText: '',
                optionId: '1b5f1404-4744-49c0-b926-94ed6fa2d8be',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: ''
              },
              {
                questionId: '5ee0a063-fb73-4048-85dc-375c8f71b5c9',
                answerText: '',
                optionId: '1b5f1404-4744-49c0-b926-94ed6fa2d8be',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: ''
              }
            ],
            dossierNumber: '27I230000434'
          },
          {
            questionnaireId: 'b2957608-a2dc-487b-97c3-61b173097db5',
            questionnaireType: 'AdditionnalClient',
            answers: [
              {
                questionId: 'dbc99907-35db-4d99-8b84-16c2d77d0a3f',
                answerText: null,
                optionId: '',
                answerValue: '',
                answerDate: '',
                answerTime: '',
                isStructuralInformation: false,
                structuralInformation: '',
                structuralInformationField: '',
                answerId: '',
                sequenceOrder: '0'
              }
            ],
            dossierNumber: '27I230000434'
          }
        ],
        reportingForm: {
          children: [],
          name: 'Short',
          id: selectedReportingForm,
          code: 'RF1950'
        },
        activityOption: {
          children: [],
          name: 'Phone',
          id: selectedActivityOption,
          code: 'AE1842'
        },
        comments: '',
        deliveryMethods: [
          {
            product: {
              isGeneric: false,
              id: selectedDeliveryMethod,
              code: 'P311',
              name: 'Damage assessment inventory/goods'
            },
            selectedDeliveryMethod: {
              id: '65c6df3d-a0e3-4328-9cad-faf2970a7bbc',
              code: 'E311',
              name: 'Email',
              show: true,
              isSelected: true,
              icon: 'fas fa-at'
            }
          }
        ]
      },
      visitRecords: [
        {
          id: '',
          typeOfContact: 'Contact',
          locationObjectX: {
            object: '',
            address: ''
          },
          locationUnknown: false,
          isActive: false,
          location: {
            addressLevel1: '',
            addressLevel2: '',
            houseNumberAddition: '',
            addressCountry: null,
            addressZip: '',
            addressState: ''
          },
          time: {
            time: '',
            id: ''
          },
          contactPerson: 'Firas Zouaghi',
          phoneNumber: '',
          reason: null,
          priority: 'C24'
        }
      ],
      userName: 'Firas Zouaghi',
      entrySystem: null,
      productCombinations: [],
      triggeredActivities: [
        {
          isMain: true,
          isQuestionTriggered: false,
          hasChildren: false,
          isDamage: true,
          isSelected: true,
          selectedMainObject: '83760580-6eb4-4642-8710-65db6f9aab9b',
          selectedObject: '48c4cada-e255-474d-979d-8932f5072e8f',
          selectedSubObject: null,
          selectedCoverages: [
            '9afbf95a-a0fc-4c46-b8f8-774b6f1b3d19',
            '2dc41e59-93cc-4397-b7b7-8a552d1b797b'
          ],
          children: [],
          productIds: [
            '38329a79-330e-44f2-a28c-9e8d178b7c51'
          ],
          involvedObjectId: 'b4e12a32-4327-0e5d-6468-d1bf15cd2c06',
          id: '84dd1bc2-7113-4edb-b22c-f7543caa8b4e',
          code: 'TA1164',
          name: 'Damage assesment',
          productActivityName: 'Damage assesment-Inventory',
          logo: 'fas fa-calculator'
        }
      ],
      reporter: {
        id: '9ce2d53e-528b-4f74-aad2-1072d07b8fa1',
        city: null,
        postalCode: null,
        type: 'Insurer',
        name: 'ProsPecT Insurer -  - ',
        imagePath: 'data:image/png;base64,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',
        phoneNumber: '0123456789',
        email: 'test@test.com'
      },
      creationDate: '2023-06-17T17:24:26.036Z',
      contact: {
        intakeMethod: 'Email',
        salutationId: null,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        contactPersonType_Id: null,
        organizationUnit_Id: null,
        id: null
      },
      finishDate: new Date().toISOString()
    };
    const url = `${this.intakeApiUrl}/saveDossier`;
    return this.postRequestWithHeaders(url, body);
  }
  getInterruptionReasons(): Observable<any> {
    const url = `${this.frontOfficeUrl}/list/L001/?language=${this.currentLanguage}`;
    return this.getRequestWithHeaders(url);
  }
  getDossierScreening(): Observable<any> {
    const url = `${this.frontOfficeUrl}/DossierScreening/?language=en-GB`;
    return this.http.post<any>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

}
