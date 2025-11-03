import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
    path: '', component: Layout, children: [
      { path: '', component: Home }
    ]
  }
];
