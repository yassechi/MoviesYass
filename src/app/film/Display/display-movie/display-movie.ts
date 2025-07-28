import { Component, input } from '@angular/core';
import { MovieModel } from '../../Models/movie-film';

@Component({
  selector: 'app-display-movie',
  imports: [],
  templateUrl: './display-movie.html',
  styleUrl: './display-movie.scss'
})
export class DisplayMovie {

  movie = input.required<MovieModel>();

}
