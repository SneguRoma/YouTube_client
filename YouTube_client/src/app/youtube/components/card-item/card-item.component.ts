import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delCard } from '../../../redux/actions/search.actions';
import { CardItem } from '../../models/search.model';

export enum Color {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
}

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  })
export class CardItemComponent {
  constructor(private router: Router, private store: Store, private ngZone: NgZone) {}

  @Input()
    cardItem!: CardItem;

  checkDate = () => {
    if (this.cardItem) {
      const dateNow = new Date();
      const dateOfPubl = new Date(this.cardItem.date);
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
    } else {
      return Color.Blue;
    }
  };

  moreInfo = () => {
    this.ngZone.run(() => {
      this.router.navigate(['/', 'res', 'card', this.cardItem.id]);
    });
  };

  deleteCard = () => {
    this.store.dispatch(delCard(this.cardItem));
  };
}
