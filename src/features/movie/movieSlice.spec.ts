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
        nowplayingPage: 0,
        upcomingPage: 0,
        topratedPage: 0,
    };
    it('should handle initial state', () => {
        expect(MovieReducer(undefined, { type: 'unknown' })).toEqual({
            search: [],
            nowplaying: [],
            upcoming: [],
            toprated: [],
            status: 'idle',
            nowplayingPage: 0,
            upcomingPage: 0,
            topratedPage: 0,
        });
    });
});
