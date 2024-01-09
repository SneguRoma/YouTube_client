import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  CardItem,
  VideoItem,
  VideoItemStore,
} from 'src/app/youtube/models/search.model';
import { searchMockData } from 'src/app/youtube/models/searrch.mock.data';
import * as searchActions from '../actions/search.actions';
import { initialState, ISearchState } from '../state.models';

export const searchKey = 'search';

export const searchReducer = createReducer(
  initialState,
  on(searchActions.addCard, (state, card) => {
    const updatedCards = [...state.cards, card];

    return { ...state, cards: updatedCards };
  }),
  on(searchActions.delCard, (state, card) => {
    const cardIndex = state.cards.findIndex((item) => item.id === card.id);

    if (cardIndex !== -1) {
      const updatedCards = [
        ...state.cards.slice(0, cardIndex),
        ...state.cards.slice(cardIndex + 1),
      ];
      return { ...state, cards: updatedCards };
    }
    return state;
  }),
  on(searchActions.renewVideos, (state, { videos }) => {
    const updatedVideos = videos.map((video) => ({
      ...video,
      isFavorite: false,
    }));
    return { ...state, videos: updatedVideos };
  }),
  on(searchActions.toggleFavoriteVideos, (state, id) => {
    const updatedVideos = state
      .videos
      .map((item) => (item.id === id.id ? { ...item, isFavorite: !item.isFavorite } : item));
    return { ...state, videos: updatedVideos };
  }),
);

export const featureSelector = createFeatureSelector<ISearchState>(searchKey);
export const selectorVideoSearch = createSelector(
  featureSelector,
  (state) => state.videos,
);
export const selectorVideoFavorite = createSelector(featureSelector, (state) => state
  .videos
  .filter((video) => video.isFavorite));

export const selectorVideoNotFavorite = createSelector(
  featureSelector,
  (state) => state.videos.filter((video) => !video.isFavorite),
);
export const selectorCardsSearch = createSelector(
  featureSelector,
  (state) => state.cards,
);
export const selectCardById = (itemId: string) => createSelector(
  selectorCardsSearch,
  (items: CardItem[]) => items.find((item) => item.id === itemId),
);
export const selectVideoById = (itemId: string) => createSelector(
  selectorVideoSearch,
  (items: VideoItemStore[]) => items.find((item) => item.id === itemId),
);
