import { createAction, props } from '@ngrx/store';
import { CardItem, VideoItem, VideoItemStore } from 'src/app/youtube/models/search.model';

export const renewVideos = createAction(
  '[search] renewVideos',
  props<{ videos: VideoItem[] }>(),
);

export const addCard = createAction(
  '[search] addCard',
  props< CardItem >(),
);

export const delCard = createAction(
  '[search] delCard',
  props< CardItem >(),
);

export const toggleFavoriteVideos = createAction(
  '[search] toggleFavoriteVideos',
  props< { id:string } >(),
);

export const resetSearch = createAction(
  '[search] resetSearch',
);
