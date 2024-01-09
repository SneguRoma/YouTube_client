import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SearchDataService } from './search-data.service';

describe('SearchDataService', () => {
  let service: SearchDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchDataService],
    });

    service = TestBed.inject(SearchDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should call the YouTube API with the correct parameters when calling getSearchData', () => {
    const searchData = 'test';
    const expectedUrl = `search?type=video&part=snippet&maxResults=100&q=${searchData}`;

    service.setSearchData(searchData);

    service.getSearchData().subscribe();

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');

    req.flush({ items: [] });
  });
});
