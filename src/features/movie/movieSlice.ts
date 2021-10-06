import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import movieService  from './movieService';
import { GenreAPIType, GenreType, MovieState, MovieType } from './movieTypes';

export const initialMovieState: MovieState = {
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
        const response = await movieService.getGenreIdMovies();
        return response?.reduce((obj: { [key: string]: string }, item: GenreAPIType) => ({ ...obj, [item.id]: item.name }), {}) || {};
    }
);

export const getSearch = createAsyncThunk(
    'movie/search',
    async (query: string = ""): Promise<MovieType[]> => {
        const response = await movieService.getSearchMovies(query, 1);
        return response?.results || [];
    }
);


export const getTopRated = createAsyncThunk(
    'movie/toprated',
    async (_, { getState }): Promise<MovieType[]> => {
        const { movie } = getState() as { movie: MovieState };
        const response = await movieService.getTopRatedMovies(movie?.topratedPage);
        return response?.results || [];
    }
);

export const getNowPlaying = createAsyncThunk(
    'movie/nowplaying',
    async (_, { getState }): Promise<MovieType[]> => {
        const { movie } = getState() as { movie: MovieState };
        const response = await movieService.getNowPlayingMovies(movie?.nowplayingPage);
        return response?.results || [];
    }
);

export const getUpcoming = createAsyncThunk(
    'movie/upcoming',
    async (_, { getState }): Promise<MovieType[]> => {
        const { movie } = getState() as { movie: MovieState };
        const response = await movieService.getUpcomingMovies(movie?.upcomingPage);
        return response?.results || [];
    }
);


export const movieSlice = createSlice({
    name: 'Movie',
    initialState:initialMovieState,
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
            .addCase(getSearch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSearch.fulfilled, (state, action) => {
                state.status = 'idle';
                state.search = action.payload;
            })
            .addCase(getNowPlaying.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getNowPlaying.fulfilled, (state, action) => {
                state.status = 'idle';
                state.nowplaying = [...state.nowplaying, ...action.payload];
                state.nowplayingPage++;
            })
            .addCase(getUpcoming.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUpcoming.fulfilled, (state, action) => {
                state.status = 'idle';
                state.upcoming = [...state.upcoming, ...action.payload];
                state.upcomingPage++;
            })
            .addCase(getTopRated.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTopRated.fulfilled, (state, action) => {
                state.status = 'idle';
                state.toprated = [...state.toprated, ...action.payload];
                state.topratedPage++;
            })
    },
});

export const selectMovie = (state: RootState) => state.movie;

export default movieSlice.reducer;
