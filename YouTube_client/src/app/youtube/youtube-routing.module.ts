import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

import { InformationComponent } from './pages/information/information.component';
import { CardInformationComponent } from './pages/card-information/card-information.component';

const routes: Routes = [
  { path: 'res', component: SearchResultsComponent },
  { path: 'res/:id', component: InformationComponent },
  { path: 'res/card/:id', component: CardInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class YouTubeRoutingModule { }
