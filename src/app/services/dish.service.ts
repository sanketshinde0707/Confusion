import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
/* import { DISHES } from '../shared/dishes'; */
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {   /* We are configuring the services to return a promise */
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    /*earlier :-  of(DISHES).pipe(delay(2000)) */
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    /*earlier :-  of(DISHES.filter((dish) => (dish.id === id))[0]) */
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
              .pipe(map(dishes => dishes[0])) /*the query parameter use gives a array */
              .pipe(catchError(this.processHTTPMsgService.handleError));
    /*earlier :-  of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000)) */ 
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
    /*earlier :-  of(DISHES.map(dish => dish.id)) */ ; /*javascript map array operatore */
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id ,dish , httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError)); /* this returns the updated dish information */
  }


}
