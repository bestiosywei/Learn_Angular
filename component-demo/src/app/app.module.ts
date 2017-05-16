import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
// import { OrderComponent } from './order/order.component';
// import { PriceQuoteComponent } from './price-quote/price-quote.component';
import { LifeComponent } from './life/life.component';
import { Child1Component } from './child1/child1.component';
// import { ChildComponent } from './child/child.component';

const routeConfig: Routes = [
  {path: '', component: LifeComponent},
  {path: 'child', component: Child1Component}
];

@NgModule({
  declarations: [
    AppComponent,
    LifeComponent,
    Child1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
