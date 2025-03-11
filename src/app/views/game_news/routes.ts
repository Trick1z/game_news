import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'home Page'
    }
  },
  {
    path: 'info-page',
    loadComponent: () => import('./info-page/info-page.component').then(m => m.InfoPageComponent),
    data: {
      title: 'info Page'
    }
  },


];
