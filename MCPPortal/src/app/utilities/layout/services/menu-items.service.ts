/**
 * Angular
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Injectable()
 */
@Injectable({
  providedIn: 'root'
})
/**
 * InsuranceClaimFormModel name : MenuItemsService
 */
export class MenuItemsService {
  /**
   * Constructor
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get navmenu items
   */
  getmenuItems(): Observable<any> {
    return this.httpClient.get('assets/navmenu.json');
  }
}
