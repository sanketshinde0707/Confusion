import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup; /*This is the form model which will host the reactive form */
  feedback: Feedback; /*This is the data model , we an fetch data from data model thru thus*/
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname':'',
    'lastname':'',
    'telenum':'',
    'email':'',
  }
  
  validationMessages ={
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First Name must be of atleast 2 charachters long',
      'maxlength':'First Name should not exceed more than 25 charachters',
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be of atleast 2 charachters long',
      'maxlength':'Last Name should not exceed more than 25 charachters',
    },
    'telenum':{
      'required':'Tel. num is required',
      'pattern':'Tel. num must contain numbers only',
    },
    'email': {
      'required':'Email is required',
      'pattern':'Email not in valid fomat',
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm(); /* when this class is buit this form will be created*/
   }

  ngOnInit(): void {
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0, [Validators.required,Validators.pattern]],
      email: ['', [Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    }); /*this is more like te feedback class, this doesnt has to be same , if it is
        then it just becomes simple to map data from data model */

        this.feedbackForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set form validation messages
  };

  onValueChanged(data?: any){
    if(!this.feedbackForm) { return;}
    const form = this.feedbackForm ;
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

  onSubmit() {
    this.feedback = this.feedbackForm.value /* this gives a javascript object */
    /* here the data model and the form model happens to be same so i can directly 
    map the form model to data model . */
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telenum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }

}
