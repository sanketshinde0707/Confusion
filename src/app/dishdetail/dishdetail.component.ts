import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params ,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { setClassMetadata } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility',[
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1,
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0,
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: string[];
  errMess: string;
  prev: string;
  next: string;
  dishcopy: Dish;
  visibility = 'shown';

  commentForm: FormGroup; /* Here this is our Form Model */
  comment: Comment; /* Here comment acts like a data model */

  formErrors = {
    'author':'',
    'rating':'',
    'comment':'',
    'date':'date',
  } ;
  
  validationMessages ={
    'author': {
      'required': 'Your Name is required',
      'minlength': 'Your Name must be of atleast 2 charachters long',
      'maxlength':'Your Name should not exceed more than 25 charachters',
    },
    'comment': {
      'required': 'Your comment is required',
      'minlength': 'Your comment must be of atleast 2 charachters long',
      'maxlength':'Last Name should not exceed more than 50 charachters',
    },
  } ;

  constructor(private dishService: DishService ,
    private route: ActivatedRoute ,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL,) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.dishService.getDishIds()
     .subscribe((dishIds) => this.dishIds = dishIds);

    this.route.params
    .pipe(switchMap((params: Params) => {this.visibility = 'hidden' ; return this.dishService.getDish(params['id'])} ))
      .subscribe( dish => {this.dish = dish ;this.dishcopy = dish ; this.setPrevNext(dish.id); this.visibility = 'shown';},
      errmess => this.errMess = <any>errmess );

  }

  createForm() {
    this.commentForm = this.fb.group({
      'author': ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      'rating': '',
      'comment': ['' , [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      'date': '',
    }) 

    this.commentForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages


  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return;}
    const form = this.commentForm ;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {  /*This method returns a boolean if the object has that property */
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }  
    }
  }

  onSubmit(){
    var d = new Date();
    this.comment = this.commentForm.value;
    this.comment.date = d.toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
        .subscribe(dish => {
          this.dish = dish ; this.dishcopy = dish ;
        }, errmess => { this.dish = null ; this.dishcopy  = null ; this.errMess = <any>errmess})
    this.commentForm.reset({'rating': '5'})
  } ;

 
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }



}
