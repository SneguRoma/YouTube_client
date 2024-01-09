import { Component, OnInit, OnDestroy } from '@angular/core';

import { SearchDataService } from 'src/app/core/servises/search-data/search-data.service';
import { SettingsToggleService } from 'src/app/youtube/servises/settings-toggle/settings-toggle.service';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { renewVideos } from 'src/app/redux/actions/search.actions';
import { AuthService } from '../../servises/authservice/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  })
export class HeaderComponent implements OnInit {
  searchText = '';

  name!: string;

  private searchSubject = new Subject<string>();

  private dataSubscription: Subscription = new Subscription();

  private authSubs: Subscription = new Subscription();

  settingsVisible: boolean = true;

  constructor(
    private store: Store,
    private authService: AuthService,
    private dataService: SearchDataService,
    private filteringService: SettingsToggleService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authSubs = this.authService?.getUserName().subscribe((userName) => {
      this.name = userName ?? '';
    });

    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => this.handleSearch(term)),
      )
      .subscribe();
  }

  favorite = () => {
    this.router.navigate(['/favourite']);
  };

  handleSearch(term: string): Observable<any[]> {
    if (term.length >= 3) {
      this.dataService.setSearchData(term);
      return this.dataService.getVideoInfo().pipe(
        tap((data) => {
          this.store.dispatch(renewVideos({ videos: data }));
        }),
      );
    }
    return of([]);
  }

  search() {
    this.searchSubject.next(this.searchText);

    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/auth']);
    } else {
      this.router.navigate(['/res']);
    }
  }

  openSettings() {
    this.filteringService.toggleFiltering();
  }

  login() {
    if (this.authService.isAuthenticatedUser()) {
      this.authService.logout();
      this.searchSubject.next('');
      this.router.navigate(['/auth']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  openAdmin() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/auth/admin']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  searchPage() {
    this.router.navigate(['/res']);
  }

  ngOnDestroy() {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
  }
}
