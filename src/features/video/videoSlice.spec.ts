import videoReducer, {
    VideoState,
} from './videoSlice';

describe('counter reducer', () => {
    const initialState: VideoState = {
        home: [],
        subscription: [],
        explore: [],
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(videoReducer(undefined, { type: 'unknown' })).toEqual({
            home: [],
            subscription: [],
            explore: [],
            status: 'idle',
        });
    });
});
