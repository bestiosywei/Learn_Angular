import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  // 模板式表单是异步的
  constructor() { }

  ngOnInit() {
  }

  onSubmit(value: any, valid: boolean) {
    console.log(valid);
    console.log(value);
  }

  public mobileValid: boolean = true;
  public mobileUntouched: boolean = true;

  onMobileInput(form: NgForm) {
    if (form) {
      this.mobileValid = form.form.get('mobile').valid;
      this.mobileUntouched = form.form.get('mobile').untouched;
    }
  }
}
