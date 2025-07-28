import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllMovie, MovieModel } from '../Models/movie-film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  http = inject(HttpClient);

  getAll = (): Observable<AllMovie> => {
    return this.http
      .get<AllMovie>(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=56f3b3408303f18a9966b2153adbf80c`);  
  };
}
