interface Dimensions {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Dimensions;
  medium: Dimensions;
  high: Dimensions;
  standard: Dimensions;
  maxres: Dimensions;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface VideoItemStore {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
  isFavorite: boolean;
}

export interface AppData {
  TODO: string;
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoId {
  kind: string;
  videoId: string;
}

interface SnippetSearch {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface SearchResult {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: SnippetSearch;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: SearchResult[];
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  link: string;
  linkVideo: string;
  date: Date;
  tags: string[];
}
