import authReducer, {
    AuthState,
} from './authSlice';

describe('counter reducer', () => {
    const initialState: AuthState = {
        account: null,
        status: 'idle',
    };
    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            account: null,
            status: 'idle',
        });
    });
});
