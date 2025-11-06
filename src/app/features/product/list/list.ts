import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product';

@Component({
  imports: [MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, CurrencyPipe],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  readonly displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  readonly pageSizeOptions = [5, 10, 25, 50];

  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  readonly productService = inject(ProductService);
  readonly productsData = this.productService.getProducts(this.pageIndex, this.pageSize);

  onPageChange(event: PageEvent): void {
    if (event.pageSize !== this.pageSize()) {
      this.pageIndex.set(0);
    } else {
      this.pageIndex.set(event.pageIndex);
    }
    this.pageSize.set(event.pageSize);
  }
}
