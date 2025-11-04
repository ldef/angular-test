import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './features/home/home';
import { ZonelessComponent } from './features/zoneless/zoneless';

export const routes: Routes = [
    {
    path: '', component: Layout, children: [
      { path: '', component: Home },
      { path: 'zoneless', component: ZonelessComponent },
      { path: 'products', loadChildren: () => import('./features/product/product.route').then(m => m.routes) },
    ]
  }
];
