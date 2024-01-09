import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleFavoriteVideos } from '../../../redux/actions/search.actions';
import { VideoItemStore } from '../../models/search.model';
import { Color } from '../card-item/card-item.component';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  })
export class SearchItemComponent {
  constructor(private router: Router, private store: Store, private ngZone: NgZone) {}

  @Input()
    videoItem!: VideoItemStore;

  checkDate = () => {
    const dateNow = new Date();
    const dateOfPubl = new Date(this.videoItem.snippet.publishedAt);
    const differenceInMilliseconds = dateNow.getTime() - dateOfPubl.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    switch (true) {
      case differenceInDays > 180:
        return Color.Red;
      case differenceInDays > 30:
        return Color.Yellow;
      case differenceInDays > 7:
        return Color.Green;
      default:
        return Color.Blue;
    }
  };

  moreInfo = () => {
    this.ngZone.run(() => {
      this.router.navigate(['/', 'res', this.videoItem.id]);
    });
  };

  addToFavourite = () => {
    this.store.dispatch(toggleFavoriteVideos({ id: this.videoItem.id }));
  };
}
