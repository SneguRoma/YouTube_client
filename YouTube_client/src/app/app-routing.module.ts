import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { Page404Component } from './youtube/pages/page404/page404.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '', loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule), canActivate: [authGuard] },
  { path: 'favourite', loadChildren: () => import('./favourite/favourite.module').then((m) => m.FavouriteModule), canActivate: [authGuard] },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  })
export class AppRoutingModule { }
