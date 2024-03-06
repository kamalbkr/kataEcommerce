import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { Cart } from '../../models/cart';
import { KataDataService } from '../../core/kata-data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInCart = 0;

  constructor(private activatedRoute: ActivatedRoute,private cartService: CartService, private kataDataservice: KataDataService) {

  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')) ;
   
      if(id)
         {
     
        this.product = this.kataDataservice.getAllProducts().find(f=>f.id == id) || undefined  ;
      
         this.cartService.cartSource$.pipe(take(1)).subscribe((cart:Cart | null) => {
         const item = cart?.items.find(x => x.id === +id);
          if (item) {
            this.quantity = item.quantity;
            this.quantityInCart = item.quantity;
          }}
      
        )
   }
   
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateCart() {
    if (this.product) {
      if (this.quantity > this.quantityInCart) {
        const itemsToAdd = this.quantity - this.quantityInCart;
        this.quantityInCart += itemsToAdd;
        this.cartService.addItemToCart(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInCart - this.quantity;
        this.quantityInCart -= itemsToRemove;
        this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInCart === 0 ? 'Add to cart' : 'Update cart';
  }
}
