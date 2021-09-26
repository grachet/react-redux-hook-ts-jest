import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies, getSearchMovies, getGenreIdMovies } from './movieAPI';

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
export interface MovieState {
    genre: { [key: number]: string },
    search: MovieType[]
    nowplaying: MovieType[];
    upcoming: MovieType[];
    toprated: MovieType[];
    nowplayingPage: number;
    upcomingPage: number;
    topratedPage: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieState = {
    genre: {},
    search: [],
    nowplaying: [],
    upcoming: [],
    toprated: [],
    nowplayingPage: 1,
    upcomingPage: 1,
    topratedPage: 1,
    status: 'idle',
};

export const getGenre = createAsyncThunk(
    'movie/genre',
    async () => {
        const response = await getGenreIdMovies();
        return response?.reduce((obj: { [key: string]: string }, item: GenreAPIType) => ({ ...obj, [item.id]: item.name }), {}) || {};
    }
);


export const search = createAsyncThunk(
    'movie/search',
    async (query: string = "") => {
        const response = await getSearchMovies(query, 1);
        console.log(response)
        return response?.results || [];
    }
);


export const toprated = createAsyncThunk(
    'movie/toprated',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getTopRatedMovies(movie.topratedPage);
        return response?.results || [];
    }
);

export const nowplaying = createAsyncThunk(
    'movie/nowplaying',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getNowPlayingMovies(movie.nowplayingPage);
        return response?.results || [];
    }
);

export const upcoming = createAsyncThunk(
    'movie/upcoming',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getUpcomingMovies(movie.upcomingPage);
        return response?.results || [];
    }
);


export const movieSlice = createSlice({
    name: 'Movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenre.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGenre.fulfilled, (state, action) => {
                state.status = 'idle';
                state.genre = action.payload;
            })
            .addCase(search.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(search.fulfilled, (state, action) => {
                state.status = 'idle';
                state.search = action.payload;
            })
            .addCase(nowplaying.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(nowplaying.fulfilled, (state, action) => {
                state.status = 'idle';
                state.nowplaying = [...state.nowplaying, ...action.payload];
                state.nowplayingPage++;
            })
            .addCase(upcoming.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(upcoming.fulfilled, (state, action) => {
                state.status = 'idle';
                state.upcoming = [...state.upcoming, ...action.payload];
                state.upcomingPage++;
            })
            .addCase(toprated.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(toprated.fulfilled, (state, action) => {
                state.status = 'idle';
                state.toprated = [...state.toprated, ...action.payload];
                state.topratedPage++;
            })
    },
});

export const selectMovie = (state: RootState) => state.movie;

export default movieSlice.reducer;
