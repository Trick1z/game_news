import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./add/add.component').then(m => m.AddComponent),
    data: {
      title: 'add Page'
    }
  },
  {
    path: 'all',
    loadComponent: () => import('./all-data/all-data.component').then(m => m.AllDataComponent),
    data: {
      title: 'alldata Page'
    }
  },

];
