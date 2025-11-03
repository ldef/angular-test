import { Component, inject } from '@angular/core';
import { ProductService } from '../product';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  productService = inject(ProductService);

  products$ = this.productService.getProducts();
  
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
}
