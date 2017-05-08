import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Product1Component } from './product1/product1.component';
import { Product2Component } from './product2/product2.component';
import { ProductService } from './share/product.service';
import { LogService } from './share/log.service';
import { LoggerService } from './share/logger.service';


@NgModule({
  declarations: [
    AppComponent,
    Product1Component,
    Product2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
  {
    provide: ProductService,
    useFactory: (logger, appConfig) => {
      if (appConfig.isDev) {
        return new ProductService(logger);
      }else {
        return new LogService(logger);
      }
    },
    deps: [LoggerService, 'APP_CONFIG'],
  },
    LoggerService,
  {
    provide: 'APP_CONFIG', useValue: {isDev: false}
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
