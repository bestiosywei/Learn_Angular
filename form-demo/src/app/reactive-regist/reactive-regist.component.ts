import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {mobileValidator, equalValidator, mobileAsyncValidator} from '../validator/validator';

@Component({
  selector: 'app-reactive-regist',
  templateUrl: './reactive-regist.component.html',
  styleUrls: ['./reactive-regist.component.css']
})
export class ReactiveRegistComponent implements OnInit {

  public formModel: FormGroup;
  constructor(fb: FormBuilder) {
    // this.formModel = new FormGroup({
    //   username: new FormControl(),
    //   mobile: new FormControl(),
    //   passwordsGroup: new FormGroup({
    //     password: new FormControl(),
    //     pconfirm: new FormControl()
    //   })
    // });

    // FormBuilder----上面的简化版
    this.formModel = fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]], 
      //第一个参数是默认值，第二参数是一个数组，是校验方法，第三个参数是一个异步校验方法
      mobile: ['', mobileValidator, mobileAsyncValidator],
      passwordsGroup: fb.group({
        password: ['', [Validators.minLength(6)]],
        pconfirm: ['']
      }, {validator: equalValidator})
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let isValid: boolean = this.formModel.get('username').valid;
    console.log('username的校验结果：' + isValid);
    let errors: any = this.formModel.get('username').errors;
    console.log('username的错误信息是：' + JSON.stringify(errors));
    // console.log(this.formModel.value);
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }
}
