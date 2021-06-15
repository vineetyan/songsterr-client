import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SongsService } from './songs.service';

describe('SongsService', () => {
  let service: SongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongsService]
    });
    service = TestBed.inject(SongsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
