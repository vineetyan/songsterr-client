import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params } from '@angular/router';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';
import { SearchResultComponent } from './search-result.component';
import { Song } from 'src/models';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      queryParams: {
        subscribe: (params: Params) => {
          fixture.debugElement.injector.get(
            SongsService
          ).fetchSongs('xyz');
        }
      }
    });
    const routerStub = () => ({ navigate: (array: any[], object: NavigationExtras) => ({}) });
    const songsServiceStub = () => ({
      fetchSongs: (q: string) => ({ subscribe: (f: Promise<Song[]>) => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchResultComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: SongsService, useFactory: songsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`songs has default value`, () => {
    expect(component.songs).toEqual([]);
  });
  
  
  it('searchSong navigates to other route', () => {
    const routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.callThrough();
    component.searchSong('hello world');
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const songsServiceStub: SongsService = fixture.debugElement.injector.get(
        SongsService
      );
      spyOn(songsServiceStub, 'fetchSongs').and.callThrough();
      component.ngOnInit();
      expect(songsServiceStub.fetchSongs).toHaveBeenCalled();
    });
  });
});
