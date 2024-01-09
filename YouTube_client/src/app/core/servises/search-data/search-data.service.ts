import { Injectable } from '@angular/core';
import {
  BehaviorSubject, Observable, map, switchMap,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AppData,
  SearchListResponse,
  VideoItem,
} from 'src/app/youtube/models/search.model';

@Injectable()
export class SearchDataService {
  constructor(private http: HttpClient) {}

  private searchData = new BehaviorSubject<string>('');

  private youTubeApiUrl = 'search';

  private youtubeVideosApiUrl = 'videos';

  setSearchData(data: string) {
    this.searchData.next(data);

    this.getSearchData();
  }

  getSearchString() {
    return this.searchData;
  }

  getSearchData(): Observable<string[]> {
    return this.searchData.pipe(
      switchMap((term) => {
        const params = new HttpParams()
          .set('type', 'video')
          .set('part', 'snippet')
          .set('maxResults', '100')
          .set('q', term);
        const apiUrl = `${this.youTubeApiUrl}?${params.toString()}`;

        return this.http.get<SearchListResponse>(apiUrl);
      }),
      map((response) => response.items.map((item) => item.id.videoId)),
    );
  }

  getVideoInfo(): Observable<VideoItem[]> {
    return this.getSearchData().pipe(
      switchMap((videoIds) => {
        const videoIdsString = videoIds.join(',');
        const params = new HttpParams()
          .set('id', videoIdsString)
          .set('part', 'snippet,statistics');

        const apiUrl = `${this.youtubeVideosApiUrl}?${params.toString()}`;

        return this.http.get<AppData>(apiUrl);
      }),
      map((response) => response.items.map((item) => item)),
    );
  }
}
