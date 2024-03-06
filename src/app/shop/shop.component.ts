import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { KataService } from '../core/kata.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[] = []
  constructor(private kataService: KataService) { }


  $destroy = new Subject<void>()
  ngOnInit(): void {
    this.productsList()
  }
  ngOnDestroy(): void {
    this.$destroy.next()
    this.$destroy.complete()
  }
  productsList() {
    this.kataService.getProducts().pipe(
      takeUntil(this.$destroy),
      map(m => {

        this.products = m
      })
    ).subscribe()
  }
}
