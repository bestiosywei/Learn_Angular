import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  // 依赖注入http
  constructor(public http: Http) { }

  // 初始化所有的商品
  // public products: Product[] = [
  //   new Product(1, '第一个商品', 123, 3.5, '这个是商品的描述的描述', ['食物', '电子产品']),
  //   new Product(2, '第二个商品', 123, 4.5, '这个是商品的描述的描述', ['食物']),
  //   new Product(3, '第三个商品', 123, 2.5, '这个是商品的描述的描述', ['电子产品']),
  //   new Product(4, '第四个商品', 123, 5, '这个是商品的描述的描述', ['食物', '图书']),
  //   new Product(5, '第五个商品', 123, 1.5, '这个是商品的描述的描述', ['食物', '图书']),
  //   new Product(6, '第六个商品', 123, 3.5, '这个是商品的描述的描述', ['电子产品', '图书']),
  //   new Product(7, '第七个商品', 123, 2.5, '这个是商品的描述的描述', ['图书']),
  //   new Product(8, '第八个商品', 123, 4.5, '这个是商品的描述的描述', ['食物', '图书'])
  // ];

  // 初始化所有商品的评论
  // public comments: Comment[] = [
  //   new Comment(1, 1, '2017-03-12 22:22:22', '小名', 3.6, '东西不错'),
  //   new Comment(2, 1, '2017-01-22 10:22:22', '张三', 4, '东西不错'),
  //   new Comment(3, 1, '2017-02-12 9:22:22', '李四', 5, '东西不错'),
  //   new Comment(4, 2, '2017-04-10 2:22:22', '王五', 1, '东西不错')
  // ];

  // 得到所有的商品
  // getProducts (): Product[] {
  //   return this.products;
  // } 

  // 从服务器中获取数据----返回一个可观测的流
  getProducts (): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  // 得到单个商品
  // getProduct (id: number): Product {
  //   for (let i = 0; i < this.products.length; i++) {
  //       if (id == this.products[i].id) {
  //         return this.products[i];
  //       }
  //   }
  // }

  // 从服务器中获取一个单个信息
  getProudct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }


  // 获取评论
  // getCommentsForProductId(id: number) : Comment[] {
    // return this.comments.filter((comment: Comment) => {
      // filter函数的参数是一个函数
      // 返回其结果为true的元素,组成的数组
       // return comment.productId == id;
    // });
  // }

  // 从服务器获取评论
  getCommentsForProductId(id: number) : Observable<Comment[]> {
    return this.http.get('api/product/' + id + '/comments').map(res => res.json());
  }
  

  // 得到所有产品分类
  getAllCategories(): string[] {
    return ['电子产品', '食物', '图书'];
  }

  // 从服务器返回的数据，进行查询
  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/api/products/', {search: this.encodeParams(params)}).map(res => res.json());
  }

  // 查询参数
  public encodeParams(params: ProductSearchParams) {
    let sum: string = '';
    Object.keys(params)
      .filter(key => params[key])
      .forEach(key => {
         sum += key + '=' + params[key] + '&'
      });
    sum = sum.slice(0, sum.length-1);
    console.log(sum);
    return sum;

    // return Object.keys(params)
    //  .filter(key => params[key]) //过滤是否存在值
    //  .reduce((sum: URLSearchParams, key: string) => {
    //    sum.append(key, params[key]);
    //    console.log(sum.append);
    //    return sum;
    //  }, new URLSearchParams());

  }

  // 搜索事件的流
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

}

//  查询参数的类
export class ProductSearchParams {
  constructor(
    public title:string,
    public price: number,
    public category:string
  ) {}
}

export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ) {}
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public username: string,
    public rating: number,
    public content: string
  ){}
}
