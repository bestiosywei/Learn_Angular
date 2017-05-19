import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../share/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public categories: string[];
  public formModel: FormGroup;

  constructor(public productService: ProductService) { 
    let fb = new FormBuilder();
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  // 验证正数的
  positiveNumberValidator(control: FormControl): any{
    if (!control.value) {
      return null;
    }

    let price = parseInt(control.value);
    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }
  }

  // 提交
  onSearch() {
    if (this.formModel.valid) {
       console.log(this.formModel.value);
       // 发射这个搜索事件
       this.productService.searchEvent.emit(this.formModel.value);
    }
  }

}
