import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class KataService {
  api: string = environment.apiUrl
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products`)
  }
}
