import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, of, Subject, takeUntil } from 'rxjs';
import { KataService } from '../core/kata.service';
import { Product } from '../models/product';
import { KataDataService } from '../core/kata-data.service';
import { Pagination } from '../models/pagination.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[] = []
  pageSize: number = 10
  page: number = 1
  totalCount: number = 0
  public paginationTable!: Pagination<Product>;
  constructor(private kataService: KataService, private kataDataservice: KataDataService) { }


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
        this.totalCount = this.products.length
        // this.kataDataservice.setProduct(this.products)
        const dataObj = {
          page: 0,
          pageSize: 10,
          collectionSize: this.products.length,
          data: of(this.products.slice(0, 4)),
          list: this.products
        }
        this.paginationTable = dataObj
        console.log(this.paginationTable);

      })
    ).subscribe()
  }

  refreshbookings() {

    if (this.paginationTable.list) this.paginationTable.data = of(this.paginationTable.list
      .map((container: any, i: number) => ({ idb: i + 1, ...container }))
      .slice((this.paginationTable.page - 1) * this.paginationTable.pageSize, (this.paginationTable.page - 1) * this.paginationTable.pageSize + this.paginationTable.pageSize));
  }

}
