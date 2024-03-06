//import * as cuid from "cuid"
import { Product } from "./product";

export interface CartItem extends Product {
    quantity: number 
}

export interface Cart {
    id: string
    items: CartItem[]
}

export class Cart implements Cart {
    id ="45454";
    items: CartItem[] = [];
}

export interface CartTotals {
    shipping: number;
    subtotal: number;
    total: number;
}