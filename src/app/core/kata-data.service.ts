import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class KataDataService {
  private products:Product[]=[]

  constructor() { }
  setProduct(p:Product[]){
    this.products = p
  }
  getAllProducts():Product[]{
return this.products
  }
}
