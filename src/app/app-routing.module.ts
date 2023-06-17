import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((module) => module.WebsiteModule),
    data: {
      preload: true
    }
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
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
