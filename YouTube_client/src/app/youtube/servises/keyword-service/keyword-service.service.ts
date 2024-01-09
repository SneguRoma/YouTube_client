import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  })
export class KeywordService {
  private keywordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  keyword$: Observable<string> = this.keywordSubject.asObservable();

  setKeyword(keyword: string) {
    this.keywordSubject.next(keyword);
  }

  getKeyword(): string {
    return this.keywordSubject.value;
  }
}
