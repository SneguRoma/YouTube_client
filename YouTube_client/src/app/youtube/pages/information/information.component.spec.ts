import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { InformationComponent } from './information.component';
import { VideoItemStore } from '../../models/search.model';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;
  let store: MockStore;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationComponent],
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

    fixture = TestBed.createComponent(InformationComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    component.videoItem = videoItem;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct route on back', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.back();
    expect(navigateSpy).toHaveBeenCalledWith(['/res']);
  });
});
