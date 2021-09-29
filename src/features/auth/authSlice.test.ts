import { ANONYMOUS_ACCOUNT } from '../../constantes/constantes';
import { GAPI_LOGIN_USER_TEST } from '../../constantes/testConstantes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import authReducer, { login, loginAnonymous } from './authSlice';
import { AuthState } from './authTypes';
import { ACCOUNT_TEST } from './../../constantes/testConstantes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('./authService');

const initialState: AuthState = {
    account: null,
    status: 'idle',
};

describe('Auth Reducer', () => {

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            account: null,
            status: 'idle',
        });
    });

    it('should handle login anonymous', () => {
        const actual = authReducer(initialState, loginAnonymous());
        expect(actual.account).toEqual(ANONYMOUS_ACCOUNT);
    });

});

describe('AuthReducer Login', () => {

    it('should pass login gapi', async () => {

        const expectedActions = [
            {
                type: login.pending.type
            },
            {
                type: login.fulfilled.type,
                payload: GAPI_LOGIN_USER_TEST
            }
        ];

        const store = mockStore({
            account: null,
            status: 'idle',
        });

        return store.dispatch(login()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    // describe('should fail login gapi', () => {
    //     const error = new Error('FAIL!');
    //     beforeEach(() => {
    //         login.mockRejectedValue(error);
    //     });
    //     it('dispatches failure');
    // });

});
