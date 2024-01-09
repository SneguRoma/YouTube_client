import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Router } from '@angular/router';
import { toggleFavoriteVideos } from '../../../redux/actions/search.actions';
import { VideoItemStore } from '../../models/search.model';

import { SearchItemComponent } from './search-item.component';
import { Color } from '../card-item/card-item.component';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [provideMockStore()],
    });

    const videoItem: VideoItemStore = {
      kind: 'qwert',
      etag: 'string',
      id: 'string',
      snippet: {
        publishedAt: '2023-09-01',
        channelId: 'string',
        title: 'string',
        description: 'string',
        thumbnails: {
          default: {
            url: 'https://example.com/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://example.com/medium.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://example.com/high.jpg',
            width: 480,
            height: 360,
          },
          standard: {
            url: 'https://example.com/standard.jpg',
            width: 640,
            height: 480,
          },
          maxres: {
            url: 'https://example.com/maxres.jpg',
            width: 1920,
            height: 1080,
          },
        },
        channelTitle: 'string',
        tags: ['string'],
        categoryId: 'string',
        liveBroadcastContent: 'string',
        localized: {
          title: 'string',
          description: 'string',
        },
        defaultAudioLanguage: 'string',
      },
      statistics: {
        viewCount: 'string',
        likeCount: 'string',
        dislikeCount: 'string',
        favoriteCount: 'string',
        commentCount: 'string',
      },
      isFavorite: true,
    };

    fixture = TestBed.createComponent(SearchItemComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.videoItem = videoItem;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleFavoriteVideos action on addToFavourite', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.addToFavourite();
    expect(dispatchSpy).toHaveBeenCalledWith(
      toggleFavoriteVideos({ id: component.videoItem.id }),
    );
  });

  it('should navigate to the correct route on moreInfo', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.moreInfo();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/',
      'res',
      component.videoItem.id,
    ]);
  });

  it('should return Color.Yellow if differenceInDays is between 30 and 180', () => {
    const result = component.checkDate();
    expect(result).toEqual(Color.Yellow);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
