import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Comment, ProductService } from '../share/product.service';

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

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService
  ) { }

  ngOnInit() {
     let productId: number = this.routeInfo.snapshot.params['productId'];
     this.product = this.productService.getProduct(productId);
     this.comments = this.productService.getCommentsForProductId(productId);
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

}
