import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from '../models/models';
import { SongsService } from '../services/songs.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchText: string = '';
  songs: Song[] = [];
  isLoading : boolean = false;
  error: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private songsService: SongsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params.q;
      this.isLoading = true;
      this.songs = [];
      this.error = "";
      this.songsService.fetchSongs(params.q).subscribe(async (songsResultAsPromisable: Promise<Song[]>) => {
        this.songs = await songsResultAsPromisable;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.error = error;
    });
    });
  }

  searchSong(searchText: string) : void {
    this.router.navigate(['/search'], { queryParams: { q: searchText } });
  }
}
