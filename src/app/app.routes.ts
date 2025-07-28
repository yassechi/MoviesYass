import { Routes } from '@angular/router';
import { About } from './film/about/about';
import { GetFilm } from './film/get-film/get-film';

export const routes: Routes = [
    {path: 'about', component: About},
    {path: 'get-film', component: GetFilm},

];
