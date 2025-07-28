import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FilmService } from '../Service/film-service';
import { FormsModule } from '@angular/forms';
import { AllMovie, MovieModel } from '../Models/movie-film';
import { DisplayMovies } from '../Display/display-movies/display-movies';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { DisplayMovie } from '../Display/display-movie/display-movie';

@Component({
  selector: 'app-search',
  imports: [FormsModule, RouterModule, DisplayMovies, DisplayMovie],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search   {
  filmSrv = inject(FilmService);

  myMovies = signal<AllMovie>(<AllMovie>{});
  myMovie = signal<MovieModel>(<MovieModel>{});

  searchId: string = '';
  searchName = signal('');

  AllClicked = signal(false);
  IdClicked = signal(false);
  NameClicked = signal(false);

  private router = inject(Router);

  getAllMovies() {
    this.filmSrv.getAll().subscribe((data) => {
      this.myMovies.set(data);
    });
    this.AllClicked.set(true);
  }

  getById() {
    if (parseInt(this.searchId)) {
      this.filmSrv.getId(parseInt(this.searchId)).subscribe((data) => {
        this.myMovie.set(data);
      });
      console.log(this.searchId);
    } else {
      console.log('Not a number');
    }
    this.searchId = '';
    this.IdClicked.set(true);
    this.NameClicked.set(false);
    this.AllClicked.set(false);
  }

  getByName() {
    if (this.searchName) {
      this.filmSrv.getByName(this.searchName()).subscribe((data) => {
        this.myMovies.set(data);
      });
      console.log(this.searchId);
    } else {
      console.log('Not a string');
    }
    // this.searchName();
    this.NameClicked.set(true);
    this.IdClicked.set(false);
    this.AllClicked.set(false);

  }

  onChange(event: Event) {
    this.getByName();
  }
}
