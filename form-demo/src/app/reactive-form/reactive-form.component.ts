import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  // public username: FormControl = new FormControl('aaa');  

  public formModel: FormGroup = new FormGroup({
    dateRange: new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    }),
    emails: new FormArray([
      new FormControl('12132@qq.com'),
      new FormControl('232323@qq.com')
    ]),
    username: new FormControl('aaa')
  });


  constructor() { }

  ngOnInit() {
  }

  addEmail() {
    let emails = this.formModel.get('emails') as FormArray;
    emails.push(new FormControl());
  }
  onSubmit() {
    console.log(this.formModel.value);
  }

}
