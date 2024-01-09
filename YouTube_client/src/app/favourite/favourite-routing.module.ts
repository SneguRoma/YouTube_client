import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component';

const routes: Routes = [
  { path: '', component: FavouritePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class FavouriteRoutingModule {}
