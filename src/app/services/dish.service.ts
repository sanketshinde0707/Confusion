import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {   /* We are configuring the services to return a promise */
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Promise<Dish> {
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(DISHES.filter((dish) => (dish.id === id))[0]) , 2000)
    });
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
   
  }
}
