import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parser } from 'xml2js';
import { Song } from '../models/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getHeaders, getServerErrorMessage } from '../utilities/http-utility';

const parser = new Parser(
  {
    trim: true,
    explicitArray: true
  });

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  constructor(private httpClient: HttpClient) { }
  fetchSongs(searchText: string): Observable<Promise<Song[]>> {
    return this.httpClient.get(`${environment.songsterApiBaseUrl}songs.xml?pattern=${searchText}`,
      {
        headers: getHeaders(),
        responseType: 'text'
      }).pipe(map(async (data) => {
        try {
          const parsed = await parser.parseStringPromise(data);
          if (parsed.NSArray.Song !== undefined)
            return parsed.NSArray.Song as Song[];
        }
        catch (err) {
          console.log(err);
        }
        return [];
      })).pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
        } else {
            errorMsg = getServerErrorMessage(error);
        }
        return throwError(errorMsg);
    }));
  }
}
