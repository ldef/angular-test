import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductService } from '../product';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  readonly displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  readonly pageSizeOptions = [5, 10, 25, 50];
  readonly productService = inject(ProductService);

  readonly pageIndex = signal(0);
  readonly pageSize = signal(10);

  readonly productsData$ = combineLatest([
    toObservable(this.pageIndex),
    toObservable(this.pageSize)
  ]).pipe(
    switchMap(([pageIndex, pageSize]) => this.productService.getProducts(pageIndex, pageSize))
  );

  onPageChange(event: PageEvent): void {
    if (event.pageSize !== this.pageSize()) {
      this.pageIndex.set(0);
    } else {
      this.pageIndex.set(event.pageIndex);
    }
    this.pageSize.set(event.pageSize);
  }
}
