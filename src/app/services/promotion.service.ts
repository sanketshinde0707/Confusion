import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
/*import { PROMOTIONS } from '../shared/promotions';*/
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor( private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions') 
            .pipe(catchError(this.processHTTPMsgService.handleError));
    /* before http :- of(PROMOTIONS).pipe(delay(1000)) */
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    /* before http :- PROMOTIONS.filter((promo) => (promo.id === id))[0] */
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0])) /*used query parameters to the baseurl*/
    .pipe(catchError(this.processHTTPMsgService.handleError));
    /* before http :- of(PROMOTIONS.filter((promo) => (promo.featured))[0]).pipe(delay(1000)) */
  }

}

