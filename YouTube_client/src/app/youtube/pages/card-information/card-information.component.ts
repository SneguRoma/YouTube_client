import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delCard } from 'src/app/redux/actions/search.actions';
import { Subscription } from 'rxjs';
import { selectCardById } from 'src/app/redux/reducers/search.reducers';
import { CardItem } from '../../models/search.model';

enum Color {
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
}

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.component.html',
  styleUrls: ['./card-information.component.scss'],
  })
export class CardInformationComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  id!: string;

  private dataSubscription: Subscription = new Subscription();

  cardItem!: CardItem;

  ngOnInit() {
    this.dataSubscription = this.route.params.subscribe((params) => {
      const objectId: string = params['id'];
      this.store.select(selectCardById(objectId)).subscribe((item) => {
        if (item) this.cardItem = item;
      });
    });
  }

  checkDate = () => {
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
  };

  back = () => {
    this.router.navigate(['/', 'res']);
  };

  deleteCard = () => {
    console.log(this.cardItem);
    this.store.dispatch(delCard(this.cardItem));
    this.router.navigate(['/', 'res']);
  };

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
