import MovieReducer from './movieSlice';
import { MovieState } from './movieTypes';

describe('counter reducer', () => {
    const initialState: MovieState = {
        genre: {},
        search: [],
        nowplaying: [],
        upcoming: [],
        toprated: [],
        status: 'idle',
        nowplayingPage: 1,
        upcomingPage: 1,
        topratedPage: 1,
    };
    it('should handle initial state', () => {
        expect(MovieReducer(undefined, { type: 'unknown' })).toEqual({
            genre: {},
            search: [],
            nowplaying: [],
            upcoming: [],
            toprated: [],
            status: 'idle',
            nowplayingPage: 1,
            upcomingPage: 1,
            topratedPage: 1,
        });
    });
});
