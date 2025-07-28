import { Component, input, signal } from '@angular/core';
import { AllMovie, MovieModel } from '../../Models/movie-film';

@Component({
  selector: 'app-display-movies',
  imports: [],
  templateUrl: './display-movies.html',
  styleUrl: './display-movies.scss'
})
export class DisplayMovies {

  items = input.required<MovieModel[]>();

  deleteMovie() {

  }

  sendId() { 

  }

  
}
