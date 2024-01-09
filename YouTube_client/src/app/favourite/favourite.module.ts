import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component';
import { FavouriteRoutingModule } from './favourite-routing.module';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [
  FavouritePageComponent
  ],
  imports: [CommonModule, FormsModule, FavouriteRoutingModule, YoutubeModule],
  exports: [FavouritePageComponent],
  })
export class FavouriteModule {}
