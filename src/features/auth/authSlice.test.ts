import { ANONYMOUS_ACCOUNT } from '../../constantes/constantes';
import { GAPI_LOGIN_USER_TEST } from '../../constantes/testConstantes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import authReducer, { initialAuthState, login, loginAnonymous, logout } from './authSlice'; 
import { ACCOUNT_TEST } from './../../constantes/testConstantes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('./authService'); 

describe('Auth Reducer', () => {

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            account: null,
            status: 'idle',
        });
    });

    it('should handle login anonymous', () => {
        const actual = authReducer(initialAuthState, loginAnonymous());
        expect(actual.account).toEqual(ANONYMOUS_ACCOUNT);
    });

});

describe('AuthReducer Login / Logout', () => {

    it('Login with Gapi', async () => {

        const expectedActions = [
            {
                meta: expect.anything(),
                type: login.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: login.fulfilled.type,
                payload: ACCOUNT_TEST
            }
        ];

        const store = mockStore(initialAuthState);

        return store.dispatch(login()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    it('Logout with Gapi', async () => {

        const expectedActions = [
            {
                meta: expect.anything(),
                type: logout.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: logout.fulfilled.type,
                payload: null
            }
        ];

        const store = mockStore(initialAuthState);

        return store.dispatch(logout()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    }); 

});
