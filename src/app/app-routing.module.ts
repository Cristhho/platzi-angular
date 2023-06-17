import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { adminGuard } from './guards/admin.guard';

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
    loadChildren: () => import('./cms/cms.module').then((module) => module.CmsModule),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
