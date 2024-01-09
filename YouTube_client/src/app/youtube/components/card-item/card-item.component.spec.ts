import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { CardItemComponent, Color } from './card-item.component';
import { delCard } from '../../../redux/actions/search.actions';
import { CardItem } from '../../models/search.model';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        provideMockStore(),
      ],
    });

    const cardItem: CardItem = {
      id: 'qwert',
      title: 'string',
      description: 'string',
      link: 'string',
      linkVideo: 'string',
      date: new Date('2021-10-10'),
      tags: ['qwert'],
    };

    fixture = TestBed.createComponent(CardItemComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.cardItem = cardItem;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delCard action on deleteCard', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.deleteCard();
    expect(dispatchSpy).toHaveBeenCalledWith(delCard(component.cardItem));
  });

  it('should navigate to the correct route on moreInfo', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.moreInfo();
    expect(navigateSpy).toHaveBeenCalledWith(['/', 'res', 'card', component.cardItem.id]);
  });

  it('should return Color.Yellow if differenceInDays is between 30 and 180', () => {
    const cardItem: CardItem = {
      id: 'qwert',
      title: 'string',
      description: 'string',
      link: 'string',
      linkVideo: 'string',
      date: new Date('2023-09-01'),
      tags: ['qwert'],
    };
    component.cardItem = cardItem;
    const result = component.checkDate();
    expect(result).toEqual(Color.Yellow);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
