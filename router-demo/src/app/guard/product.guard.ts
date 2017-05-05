import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../product/product.component';
import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';


@Injectable()
export class ProductGuard implements Resolve<Product> {

  constructor(private router: Router) {

  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let productId: number = route.params['id'];
    if (productId == 1) {
      // typescript有类型声明，所以没有===这个判断
      return new Product(1, '小米8');
    }else{
      this.router.navigate(['/home']);
      return undefined;
    }
  }
}