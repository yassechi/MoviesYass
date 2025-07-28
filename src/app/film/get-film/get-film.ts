import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FilmService } from '../Service/film-service';
import { FormsModule } from '@angular/forms';
import { AllMovie, MovieModel } from '../Models/movie-film';
import { Observable } from 'rxjs';
import { DisplayMovies } from '../display-movies/display-movies';

@Component({
  selector: 'app-get-film',
  imports: [FormsModule, AsyncPipe, DisplayMovies],
  templateUrl: './get-film.html',
  styleUrl: './get-film.scss',
})

export class GetFilm {

  movies$!: Observable<AllMovie>;
  filmSrv = inject(FilmService);

  getAllMovies() {
    this.movies$ = this.filmSrv.getAll();
  }
}
