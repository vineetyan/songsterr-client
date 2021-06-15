import { TestBed } from '@angular/core/testing';
import { HighlightSearchPipe } from './highlight-search.pipe';

describe('HighlightSearchPipe', () => {
  let pipe: HighlightSearchPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HighlightSearchPipe] });
    pipe = TestBed.inject(HighlightSearchPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms Hello world to <mark>Hello</mark> world', () => {
    const value: string = 'Hello world';
    const args: string = 'Hello';
    expect(pipe.transform(value, args)).toEqual('<mark>Hello</mark> world');
  });
});
