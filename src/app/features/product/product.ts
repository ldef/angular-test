import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';

import { Product } from './model/product';
import { Paginated } from '../../mock/paginated';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(pageIndex: Signal<number>, pageSize: Signal<number>) {
    return httpResource<Paginated<Product>>(() => ({
      url: '/api/products',
      params: {
        page: pageIndex().toString(),
        pageSize: pageSize().toString()
      }
    }));
  }
}
