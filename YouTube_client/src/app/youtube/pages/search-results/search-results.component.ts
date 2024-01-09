import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchDataService } from 'src/app/core/servises/search-data/search-data.service';
import { Subscription } from 'rxjs';
import { KeywordService } from 'src/app/youtube/servises/keyword-service/keyword-service.service';
import { Store } from '@ngrx/store';
import { selectorCardsSearch, selectorVideoNotFavorite, selectorVideoSearch } from 'src/app/redux/reducers/search.reducers';
import { CardItem, VideoItemStore } from '../../models/search.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  })
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchData: string = '';

  private dataSubscription: Subscription = new Subscription();

  private keyWordSubscription: Subscription = new Subscription();

  keyword: string = '';

  results: VideoItemStore[] = [];

  cards: CardItem[] = [];

  result$ = this.store.select(selectorVideoNotFavorite);

  card$ = this.store.select(selectorCardsSearch);

  constructor(
    private dataService: SearchDataService,
    private keywordService: KeywordService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.result$.subscribe((data) => {
      this.searchData = this.dataService.getSearchString().getValue();
      this.results = data;
    });
    this.card$.subscribe((data) => {
      this.cards = data;
    });

    this.keyWordSubscription = this.keywordService.keyword$.subscribe(
      (keyword) => {
        this.keyword = keyword;
      },
    );
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.keyWordSubscription) {
      this.keyWordSubscription.unsubscribe();
    }
  }
}
