import { TestBed } from '@angular/core/testing';

import { User.ServiseService } from './user.servise.service';

describe('User.ServiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User.ServiseService = TestBed.get(User.ServiseService);
    expect(service).toBeTruthy();
  });
});
