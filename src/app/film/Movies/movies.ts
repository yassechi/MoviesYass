import { Component} from '@angular/core';
import { Search } from "../search/search";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-movies',
  imports: [Search, RouterOutlet],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  
}
