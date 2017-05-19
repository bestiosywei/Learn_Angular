import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Comment, ProductService } from '../share/product.service';
import { WebSocketService } from  '../share/web-socket.service';
import { Subscription } from 'rxjs' 

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public comments: Comment[];

  // 添加评价
  public newRating: number = 5;
  public newComment: string = '';

  // 是否显示评论框
  public isCommentHidden: boolean = true;

  // 关注商品
  public isWatched: boolean = false;
  public currentBid: number;

  // 订阅出价
  public subscription: Subscription;

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService,
              private wsService: WebSocketService
  ) { }

  ngOnInit() {
     let productId: number = this.routeInfo.snapshot.params['productId'];
     //this.product = this.productService.getProduct(productId);
     //this.comments = this.productService.getCommentsForProductId(productId);

     // 通过服务器返回产品----这个服务器返回的都是异步返回的
     // 所以可能数据还没有返回完全，页面就初始化完成，从而
     // 在模板中，会报错---comment或者product中报undefined的错误
     this.productService.getProudct(productId).subscribe(
       // 第一个流，即服务器向客户端发送的流
       product => {
         this.product = product;
         this.currentBid = product.price;
       }
     );

     // 通过服务器返回评论
     this.productService.getCommentsForProductId(productId).subscribe(
        comments => this.comments = comments
      );
  }

  // 添加评论
  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);

    // 评价后，重新就是评价值
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
    // reduce是进行累计的函数，把sum初始值设为0
    // 然后sum累计sum+comment.rating

    // 提交评论后，评论内容清空，评价星星的5星
    this.newComment = null;
    this.newRating = 5;
  }

  // 商品推送的价格
  watchProduct() {
    if (this.subscription) {
       this.subscription.unsubscribe();
       this.isWatched = false;
       this.subscription = null;
    }else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
      .subscribe(
        products => {
          let product = JSON.parse(products).find(p => p.productId == this.product.id);
          this.currentBid = product.bid;
        }
      );
    }
    
  }

}
