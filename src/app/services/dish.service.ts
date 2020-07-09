import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }1111

  getDishes(): Observable<Dish[]> {   /* We are configuring the services to return a promise */
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000)); 
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id)); /*javascript map array operatore */
  }
}
