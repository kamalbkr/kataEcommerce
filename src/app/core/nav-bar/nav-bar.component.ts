import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public cartService: CartService) {}
  getCount(items: CartItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
