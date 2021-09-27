export type MovieKeyType = "search" | "nowplaying" | "upcoming" | "toprated";

export type GenreAPIType = { id: number, name: string };

export type MovieType = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
};

export type GenreType = { [key: number]: string };

export interface MovieState {
    genre: GenreType,
    search: MovieType[]
    nowplaying: MovieType[];
    upcoming: MovieType[];
    toprated: MovieType[];
    nowplayingPage: number;
    upcomingPage: number;
    topratedPage: number;
    status: 'idle' | 'loading' | 'failed';
}
