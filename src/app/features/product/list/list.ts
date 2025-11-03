import { Component, inject } from '@angular/core';
import { ProductService } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  productService = inject(ProductService);

  products$ = this.productService.getProducts();
}
