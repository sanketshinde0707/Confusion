import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/dishes';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {   /* We are configuring the services to return a promise */
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(DISHES) , 4000)
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(DISHES.filter((dish) => (dish.id === id))[0]) , 4000)
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(DISHES.filter((dish) => (dish.featured))[0]) , 4000)
    });
  }
}
