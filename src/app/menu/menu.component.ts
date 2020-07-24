import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';;
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;

  constructor(private dishService: DishService, 
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
     .subscribe( (DISHES) => this.dishes = DISHES);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
