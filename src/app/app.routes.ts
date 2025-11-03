import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
    path: '', component: Layout, children: [
      { path: '', component: Home },
      { path: 'products', loadChildren: () => import('./features/product/product.route').then(m => m.routes) },
      { path: 'performance-demo', loadComponent: () => import('./features/demo/performance-zoneless/performance-zoneless').then(c => c.PerformanceDemoZoneless) },
      { path: 'comparison', loadComponent: () => import('./features/demo/comparison/comparison').then(c => c.ComparisonDemo) }
    ]
  }
];
