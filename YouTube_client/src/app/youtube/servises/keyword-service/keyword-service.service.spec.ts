import { KeywordService } from './keyword-service.service';

describe('KeywordService', () => {
  const service: KeywordService = new KeywordService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get keyword', () => {
    const keyword = 'testKeyword';

    expect(service.getKeyword()).toBe('');

    service.setKeyword(keyword);

    expect(service.getKeyword()).toBe(keyword);
  });

  it('should observe keyword change', () => {
    const keyword = 'testKeyword';

    const spy = jest.fn();
    service.keyword$.subscribe(spy);

    service.setKeyword(keyword);

    expect(spy).toHaveBeenCalledWith(keyword);
  });
});
