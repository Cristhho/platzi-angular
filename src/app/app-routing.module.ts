import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((module) => module.WebsiteModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./cms/cms.module').then((module) => module.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
