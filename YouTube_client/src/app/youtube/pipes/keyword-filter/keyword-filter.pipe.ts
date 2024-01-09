import { Pipe, PipeTransform } from '@angular/core';
import { VideoItem } from '../../models/search.model';

@Pipe({ name: 'appKeywordFilter' })
export class KeywordFilterPipe implements PipeTransform {
  transform(items: VideoItem[], keyword: string): VideoItem[] {
    if (!items || !keyword) {
      return items;
    }

    return items.filter(
      (item) => item.snippet.title.toLowerCase().includes(keyword.toLowerCase())
        || item.snippet.description.toLowerCase().includes(keyword.toLowerCase()),
    );
  }
}
