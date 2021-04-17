import { TestBed } from '@angular/core/testing';

import { GetAllVehiclesService } from './get-all-vehicles.service';

describe('GetAllVehiclesService', () => {
  let service: GetAllVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
