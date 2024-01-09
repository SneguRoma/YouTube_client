import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsToggleService {
  private isFilteringEnabledSubject = new BehaviorSubject<boolean>(false);

  isFilteringEnabled$ = this.isFilteringEnabledSubject.asObservable();

  toggleFiltering() {
    this.isFilteringEnabledSubject.next(!this.isFilteringEnabledSubject.value);
  }
}
