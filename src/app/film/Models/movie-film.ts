export interface MovieModel {
  id: number;
  original_title: String;
  overview: string;
  poster_path: string;
}

export interface AllMovie {
  results: MovieModel[];
}
