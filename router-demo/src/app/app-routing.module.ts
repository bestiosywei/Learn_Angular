import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDescComponent } from './product-desc/product-desc.component';
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { ChatComponent } from './chat/chat.component';
// import { LoginGuard } from './guard/login.guard';
// import { UnsaveGuard } from './guard/unsave.guard';
import { ProductGuard } from './guard/product.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'chat', component: ChatComponent, outlet: 'aux'},
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent,
    children: [
      { path: '', component: ProductDescComponent},
      { path: 'seller/:id', component: SellerInfoComponent}
    ],
    // canActivate: [
    //   LoginGuard
    // ],
    // canDeactivate: [
    //   UnsaveGuard
    // ]
    resolve: {
      product: ProductGuard
    }
  },
  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [LoginGuard, UnsaveGuard]
  providers: [ProductGuard]
})
export class AppRoutingModule { }
