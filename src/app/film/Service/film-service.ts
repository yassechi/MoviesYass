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
    return this.http.get<AllMovie>(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=ec34149ae2e6888f5db3c4706267dfd5`
    );
  };

  getId = (id: number): Observable<MovieModel> => {
    return this.http.get<MovieModel>(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=ec34149ae2e6888f5db3c4706267dfd5`
    );
  };

  getByName = (name: string): Observable<AllMovie> => {
    return this.http.get<AllMovie>(
      `https://api.themoviedb.org/3/search/movie?query=${name}&language=en-US&page=1&include_adult=false&api_key=ec34149ae2e6888f5db3c4706267dfd5`
    );
  };
}
