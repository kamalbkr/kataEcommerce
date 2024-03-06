import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;

  constructor(private sanitizer: DomSanitizer,public cartService: CartService) { }

  addItemToCart() {
     this.product && this.cartService.addItemToCart(this.product);
  }
  setProductImage(imageLink: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageLink);
  }
}
