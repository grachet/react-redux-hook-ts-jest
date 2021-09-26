import MovieReducer, {
    MovieState,
} from './movieSlice';

describe('counter reducer', () => {
    const initialState: MovieState = {
        home: [],
        subscription: [],
        explore: [],
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(MovieReducer(undefined, { type: 'unknown' })).toEqual({
            home: [],
            subscription: [],
            explore: [],
            status: 'idle',
        });
    });
});
