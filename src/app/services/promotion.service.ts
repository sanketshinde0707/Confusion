import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(PROMOTIONS) , 4000)
    });
  }
  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise( resolve => {
      //Simulate server latency with 2 seconds 
      setTimeout( () => resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]) , 4000)
    });
    
  }

}

