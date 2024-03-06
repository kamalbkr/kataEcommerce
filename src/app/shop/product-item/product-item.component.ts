import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;

  constructor(private sanitizer: DomSanitizer) { }

  addItemToBasket() {
    // this.product && this.basketService.addItemToBasket(this.product);
  }
  setProductImage(imageLink: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageLink);
  }
}
