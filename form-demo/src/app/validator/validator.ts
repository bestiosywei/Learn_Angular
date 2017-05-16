import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

// 自定义校验器----单个校验
function mobileValidator(control: FormControl): any {
  var myreg = /^(((13[0-9]{1})|((15[0-9]){1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myreg.test(control.value);
  console.log('mobile的校验结果是：' + valid);
  return valid ? null : {mobile: true};
}

// 自定义校验器---group的校验
function equalValidator(group: FormGroup): any {
  let password:FormControl = group.get('password') as FormControl;
  let pconfirm:FormControl = group.get('pconfirm') as FormControl;
  let valid:boolean = false;
  if (password && pconfirm) {
    valid = (password.value === pconfirm.value);
  }
  // console.log('密码校验结果：' + valid);
  return valid ? null : {equal: {descx: '两次输入的密码不一致'}};
}

// 定义一个异步校验器
function mobileAsyncValidator(control: FormControl): any {
  var myreg = /^(((13[0-9]{1})|((15[0-9]){1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myreg.test(control.value);
  console.log('mobile的校验结果是：' + valid);
  return Observable.of(valid ? null : {mobile: true}).delay(5000);
}
export { mobileValidator, mobileAsyncValidator, equalValidator }