import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeywordService } from 'src/app/youtube/servises/keyword-service/keyword-service.service';
import { SettingsToggleService } from 'src/app/youtube/servises/settings-toggle/settings-toggle.service';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss'],
  })
export class SearchSettingsComponent implements OnInit, OnDestroy {
  currentSortCriterion: string = '';

  keyword = '';

  isFilteringEnabled: boolean = false;

  private filteringSubs: Subscription = new Subscription();

  constructor(
    private filteringService: SettingsToggleService,
    private keywordService: KeywordService,
  ) {}

  ngOnInit() {
    this.filteringSubs = this.filteringService
      .isFilteringEnabled$.subscribe((isEnabled) => {
        this.isFilteringEnabled = isEnabled;
      });
  }

  toggleFilteringBlock() {
    this.isFilteringEnabled = !this.isFilteringEnabled;
  }

  setSortCriterion(criterion: string) {
    this.currentSortCriterion = criterion;
  }

  applyFilter() {
    this.keyword = this.keyword.trim();
    this.keywordService.setKeyword(this.keyword);
  }

  ngOnDestroy() {
    if (this.filteringSubs) {
      this.filteringSubs.unsubscribe();
    }
  }
}
