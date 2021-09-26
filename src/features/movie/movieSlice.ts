import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies } from './movieAPI';

export type MovieKeyType = "search" | "nowplaying" | "upcoming" | "toprated";
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
    search: [],
    nowplaying: [],
    upcoming: [],
    toprated: [],
    nowplayingPage: 1,
    upcomingPage: 1,
    topratedPage: 1,
    status: 'idle',
};

export const search = createAsyncThunk(
    'Movie/search',
    async () => {
        const response = await getNowPlayingMovies();
        console.log(response)
        return response.data;
    }
);

export const toprated = createAsyncThunk(
    'Movie/toprated',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getUpcomingMovies(movie.topratedPage);
        return response.results || [];
    }
);

export const nowplaying = createAsyncThunk(
    'Movie/nowplaying',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getNowPlayingMovies(movie.nowplayingPage);
        return response.results || [];
    }
);

export const upcoming = createAsyncThunk(
    'Movie/upcoming',
    async (_, { getState }) => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getTopRatedMovies(movie.upcomingPage);
        return response.results || [];
    }
);


export const movieSlice = createSlice({
    name: 'Movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
