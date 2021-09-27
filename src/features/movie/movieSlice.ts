import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies, getSearchMovies, getGenreIdMovies } from './movieAPI';
import { GenreAPIType, GenreType, MovieState, MovieType } from './movieTypes';

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
    async (): Promise<GenreType> => {
        const response = await getGenreIdMovies();
        return response?.reduce((obj: { [key: string]: string }, item: GenreAPIType) => ({ ...obj, [item.id]: item.name }), {}) || {};
    }
);

export const search = createAsyncThunk(
    'movie/search',
    async (query: string = ""): Promise<MovieType[]> => {
        const response = await getSearchMovies(query, 1);
        return response?.results || [];
    }
);


export const toprated = createAsyncThunk(
    'movie/toprated',
    async (_, { getState }): Promise<MovieType[]> => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getTopRatedMovies(movie.topratedPage);
        return response?.results || [];
    }
);

export const nowplaying = createAsyncThunk(
    'movie/nowplaying',
    async (_, { getState }): Promise<MovieType[]> => {
        const { movie } = getState() as { movie: MovieState };
        const response = await getNowPlayingMovies(movie.nowplayingPage);
        return response?.results || [];
    }
);

export const upcoming = createAsyncThunk(
    'movie/upcoming',
    async (_, { getState }): Promise<MovieType[]> => {
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
