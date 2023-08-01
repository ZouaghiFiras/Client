import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

export class GenericService<T> {

  private url: string;

  protected constructor(protected _http: HttpClient, private _url: string) {
    this.url = environment.ServiceSupplierMdmUrl + 'api/' + _url;
  }

  getAll(): Observable<T[]> {
    return this._http.get(this.url, this.prepareHeader()).pipe(map(res => res as T[]));
  }

  getOneById(id): Observable<T> {
    return this._http.get(this.url + '/' + id, this.prepareHeader()).pipe(map(res => res as T));
  }

  save(body): Observable<string> {
    return this._http.post(this.url, body, this.prepareHeader()).pipe(map(res => res as any));
  }

  update(body, id): Observable<any> {
    return this._http.put(this.url + '/' + id, body, this.prepareHeader()).pipe(map(res => res as any));
  }

  delete(id): Observable<any> {
    return this._http.delete(this.url + '/' + id, this.prepareHeader()).pipe(map(res => res as any));
  }


  getCrudData(): Observable<T[]> {
    return this._http.get(this.url + '?inactive=1', this.prepareHeader()).pipe(map(res => res as T[]));
  }

  prepareHeader() {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'});
    return {headers};
  }
}
