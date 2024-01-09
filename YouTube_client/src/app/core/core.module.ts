import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../auth/auth.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { SearchSettingsComponent } from '../youtube/components/search-settings/search-settings.component';
import { KeywordService } from '../youtube/servises/keyword-service/keyword-service.service';
import { SearchDataService } from './servises/search-data/search-data.service';
import { SettingsToggleService } from '../youtube/servises/settings-toggle/settings-toggle.service';
import { AuthService } from './servises/authservice/authservice.service';
import { Page404Component } from '../youtube/pages/page404/page404.component';
import { FavouriteModule } from '../favourite/favourite.module';
import { SearchItemComponent } from '../youtube/components/search-item/search-item.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FormsModule, YoutubeModule, AuthModule, FavouriteModule],
  providers: [
  AuthService,
  SearchDataService,
  SettingsToggleService,
  KeywordService,
  ],
  exports: [HeaderComponent, SearchSettingsComponent, Page404Component, SearchItemComponent ],
  })
export class CoreModule {}
