import { SettingsToggleService } from './settings-toggle.service';

describe('SettingsToggleService', () => {
  const service: SettingsToggleService = new SettingsToggleService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should observe isFilteringEnabled change', () => {
    const isFilteringEnabled = false;

    const spy = jest.fn();
    service.isFilteringEnabled$.subscribe(spy);

    service.toggleFiltering();

    expect(spy).toHaveBeenCalled();
  });
});
