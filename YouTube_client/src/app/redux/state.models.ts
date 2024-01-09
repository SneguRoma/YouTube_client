import { searchMockData } from '../youtube/models/searrch.mock.data';
import { CardItem, VideoItem, VideoItemStore } from '../youtube/models/search.model';

export interface ISearchState {
  cards: CardItem[];
  videos: VideoItemStore[];
}

export const initialState: ISearchState = {
  cards: [],
  videos: searchMockData.items.map((video) => ({ ...video, isFavorite: false })) ?? [],
};

export function getinitialState(): ISearchState {
  return initialState;
}
