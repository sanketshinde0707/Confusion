import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup; /*This is the form model which will host the reactive form */
  feedback: Feedback; /*This is the dataa model , we an fetch data from data model thru thus*/
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm(); /* when this class is buit this form will be created*/
   }

  ngOnInit(): void {
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: '',
      lastname: '',
      telenum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    }) /*this is more like te feedback class, this doesnt has to be same , if it is
        then it just becomes simple to map data from data model */
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value /* this gives a javascript object */
    /* here the data model and the form model happens to be same so i can directly 
    map the form model to data model . */
    console.log(this.feedback);
    this.feedbackForm.reset();
  }

}
