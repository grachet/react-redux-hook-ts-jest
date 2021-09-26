import MovieReducer, {
    MovieState,
} from './movieSlice';

describe('counter reducer', () => {
    const initialState: MovieState = {
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
