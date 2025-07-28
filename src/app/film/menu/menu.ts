import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { About } from '../about/about';
import { GetFilm } from '../get-film/get-film';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {

}
