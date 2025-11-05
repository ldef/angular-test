import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Product } from '../model/product';
import { Paginated } from '../../../mock/paginated';

@Component({
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  readonly displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  readonly pageSizeOptions = [5, 10, 25, 50];

  readonly productService = inject(ProductService);

  pageIndex = 0;
  pageSize = 10;
  products: Paginated<Product> = { items: [], total: 0 };

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.pageIndex, this.pageSize).subscribe(products => {
      this.products = products;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }
}
