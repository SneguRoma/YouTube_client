import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SearchSettingsComponent } from './components/search-settings/search-settings.component';
import { KeywordFilterPipe } from './pipes/keyword-filter/keyword-filter.pipe';
import { SearchDataService } from '../core/servises/search-data/search-data.service';
import { SettingsToggleService } from './servises/settings-toggle/settings-toggle.service';
import { KeywordService } from './servises/keyword-service/keyword-service.service';
import { YouTubeRoutingModule } from './youtube-routing.module';
import { Page404Component } from './pages/page404/page404.component';
import { InformationComponent } from './pages/information/information.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardInformationComponent } from './pages/card-information/card-information.component';

@NgModule({
  declarations: [
  SearchResultsComponent,
  SearchItemComponent,
  SearchSettingsComponent,
  KeywordFilterPipe,
  Page404Component,
  InformationComponent,
  CardItemComponent,
  CardInformationComponent,
  ],
  imports: [CommonModule, FormsModule, YouTubeRoutingModule],
  providers: [SettingsToggleService, KeywordService],
  exports: [SearchResultsComponent, SearchSettingsComponent, Page404Component, SearchItemComponent],
  })
export class YoutubeModule {}
