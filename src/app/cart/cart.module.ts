import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';


import { HttpClientModule } from '@angular/common/http';
 import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLinkActive, RouterModule } from '@angular/router'; 
import { CartRoutingModule } from './cart-routing.module';
 


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    BrowserModule,
    CartRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RouterLinkActive, 
  ]
})
export class CartModule { }
