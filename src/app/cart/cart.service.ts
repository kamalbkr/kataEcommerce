import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Cart, CartItem, CartTotals } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSource = new BehaviorSubject<Cart | null>(null);
  cartSource$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<CartTotals | null>(null);
  cartTotalSource$ = this.cartTotalSource.asObservable();

  constructor() { }

  setCart(cart: Cart) {
    this.cartSource.next(cart);
    this.calculateTotals();
  }
  getCurrentCartValue() {
    return this.cartSource.value;
  }
  addItemToCart(item: any, quantity = 1) {
    if (this.isProduct(item)) item = this.mapProductItemToCartItem(item);
    const cart = this.getCurrentCartValue() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  removeItemFromCart(id: number, quantity = 1) {
    const cart = this.getCurrentCartValue();
    if (!cart) return;
    const item = cart.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        cart.items = cart.items.filter(x => x.id !== id);
      }
      if (cart.items.length > 0) this.setCart(cart);
      else this.deleteCart(cart);
    }
  }

  deleteCart(cart: Cart) {

    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    // localStorage.removeItem('cart_id');

  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createCart(): Cart {
    const cart = new Cart();
    // localStorage.setItem('cart_id', cart.id);
    return cart;
  }
  private mapProductItemToCartItem(item: Product): CartItem {
    return {
      ...item, quantity: 0
    }
  }

  private calculateTotals() {
    const cart = this.getCurrentCartValue();
    if (!cart) return;
    const shipping = 0;
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.cartTotalSource.next({ shipping, total, subtotal });
  }

  private isProduct(item: Product | CartItem): item is Product {
    return (item as Product).id !== undefined;
  }
}
