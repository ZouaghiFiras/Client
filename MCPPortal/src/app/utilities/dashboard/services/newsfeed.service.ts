import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductOpenActionModel} from '../models/product-open-action.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  frontOfficeUrl = environment.ServiceFrontOfficeURL;

  constructor(private httpClient: HttpClient) {
  }

  getProductOpenActions(): Observable<ProductOpenActionModel[]> {
    return this.httpClient.get<ProductOpenActionModel[]>(this.frontOfficeUrl + 'OpenAction/product');
  }

  inactivateProductOpenAction(productId) {
    return this.httpClient.put(this.frontOfficeUrl + 'OpenAction/product/' + productId, productId);
  }

}
