import {
  Component, NgZone, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectVideoById } from '../../../redux/reducers/search.reducers';
import { VideoItem } from '../../models/search.model';

enum Color {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  })
export class InformationComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private ngZone: NgZone,
  ) {}

  id!: string;

  private dataSubscription: Subscription = new Subscription();

  videoItem!: VideoItem;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const objectId = params['id'];
      this.store.select(selectVideoById(objectId)).subscribe((item) => {
        if (item) this.videoItem = item;
      });
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

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

  back = () => {
    this.ngZone.run(() => {
      this.router.navigate(['/res']);
    });
  };
}
