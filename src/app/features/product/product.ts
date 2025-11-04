import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './model/product';
import { Paginated } from '../../mock/paginated';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  getProducts(page: number = 0, pageSize: number = 10): Observable<Paginated<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Paginated<Product>>('/api/products', { params});
  }
}
