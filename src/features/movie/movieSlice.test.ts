import MovieReducer, { initialMovieState } from './movieSlice';
import { MovieState } from './movieTypes'; 
import { ANONYMOUS_ACCOUNT } from '../../constantes/constantes';
import { GAPI_LOGIN_USER_TEST, MOVIE_TEST } from '../../constantes/testConstantes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import authReducer, { nowplaying  } from './movieSlice'; 
import { ACCOUNT_TEST } from './../../constantes/testConstantes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('./movieService');
 
describe('Movie Reducer', () => {

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialMovieState);
    }); 

});

describe('Movie Reducer : Fetch data', () => {

    it('should pass login gapi', async () => {

        const expectedActions = [
            {
                type: nowplaying.pending.type
            },
            {
                type: nowplaying.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(nowplaying()).then(() => {
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
