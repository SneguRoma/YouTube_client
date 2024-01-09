import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoItemStore } from 'src/app/youtube/models/search.model';
import { selectorVideoFavorite } from '../../../redux/reducers/search.reducers';// 'src/app/redux/reducers/search.reducers';

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  })
export class FavouritePageComponent implements OnInit {
  results: VideoItemStore[] = [];

  result$ = this.store.select(selectorVideoFavorite);

  constructor(private store: Store) {}

  ngOnInit() {
    this.result$.subscribe((data) => {
      this.results = data;
    });
  }
}
