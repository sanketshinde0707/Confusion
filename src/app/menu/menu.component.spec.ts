import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl'
import { Observable, from, of } from 'rxjs';
import { MatGridList } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HighlightDirective } from '../directives/highlight.directive';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {

    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]>{
        return of(DISHES);
      }
    };

    TestBed.configureTestingModule({  /* sets up an testing environment for our component */
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu' , component: MenuComponent c}]),
        MatGridList,
        MatProgressSpinner,
      ],
      declarations: [ MenuComponent ],   /* this works like the NgModule decorator in app.module.ts */
      providers: [
        {provide: DishService, useValue: dishServiceStub },
        {provide:'BaseURL',useValue: baseURL },
      ]
    })
    .compileComponents(); /* will compile the components , making them ready for testing */ 

    const dishservice = TestBed.get(DishService);
  }));

  beforeEach(() => { /* whatever we declare inside here will be declared here first , before every test */
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); /* this means that it will proceed frwrd only when all changes are completed and detected  */
  });

  it('should create' /*Description in the form of a string to tell what the test is about */, () => {
    expect(component).toBeTruthy();
  });
});
