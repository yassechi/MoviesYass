import { Routes } from '@angular/router';
import { About } from './film/about/about';
import { Movies } from './film/Movies/movies';
import { Search } from './film/search/search';
import { DisplayMovies } from './film/Display/display-movies/display-movies';
import { DisplayMovie } from './film/Display/display-movie/display-movie';


export const routes: Routes = [
    {path: 'about', component: About},
    {path: 'movies', component: Movies},
    {path: 'search', component: Search, children:[
        {path: 'edit/movies', component: DisplayMovies},
        {path: 'edit/movie', component: DisplayMovie},
    ]},

];
