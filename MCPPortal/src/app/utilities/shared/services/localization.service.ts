import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LocalizableType} from '../models/localizable-type.model';


@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  mdmUrl = environment.ServiceMasterDataURL;

  constructor(private http: HttpClient) {
  }

  public getLocalizableType(endpoint, tableName): Observable<any> {
    return this.http
      .get(`${endpoint}localizableType/?$filter=longName eq '${tableName}'`)
      // .pipe(.map((r) => r.json().value[0]))
      .pipe(flatMap((model: LocalizableType) => {
        if (model && model.lltId) {
          console.log('getLocalizableType', model);
          return of(model);
        }

        // Create a new type if it does not yet exist.
        return this.http.post(environment.endpoints.localizableType, new LocalizableType(tableName));
      }));
  }

  public getEntries(localizableEntryId) {
    return this.http
      .get(`${environment.endpoints.localizedEntry}?$filter=localizableEntryId eq ${localizableEntryId}`);
  }

  public createLocalizableEntry(entry) {
    return this.http
      .post(environment.endpoints.localizableEntry, entry);
    // .map((r) => r.json().id);
  }

  public updateLocalizableEntry(entry) {
    return this.http.put(`${environment.endpoints.localizedEntry}(${entry.id})`, entry);
  }

  public deleteLocalizableEntry(id) {
    return this.http.delete(`${environment.endpoints.localizedEntry}(${id})`);
  }


  /**
   * culture code list
   */
  public getCultureCodes(): Observable<any> {
    return this.http.get('assets/i18n/culture-code.json');
  }
}
