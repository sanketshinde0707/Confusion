import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
/* import { DISHES } from '../shared/dishes'; */
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {   /* We are configuring the services to return a promise */
    return this.http.get<Dish[]>(baseUrl + 'dishes');
    /*earlier :-  of(DISHES).pipe(delay(2000)) */
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseUrl + 'dishes/' + id);
    /*earlier :-  of(DISHES.filter((dish) => (dish.id === id))[0]) */
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true')
              .pipe(map(dishes => dishes[0]));
    /*earlier :-  of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000)) */ 
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    /*earlier :-  of(DISHES.map(dish => dish.id)) */ ; /*javascript map array operatore */
  }
}
