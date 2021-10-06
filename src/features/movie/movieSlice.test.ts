import MovieReducer, { getGenre, initialMovieState, getSearch } from './movieSlice';
import { MovieState } from './movieTypes'; 
import { ANONYMOUS_ACCOUNT } from '../../constantes/constantes';
import { GAPI_LOGIN_USER_TEST, GENRE_TEST, MOVIE_TEST } from '../../constantes/testConstantes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import authReducer, { getNowPlaying , getUpcoming, getTopRated } from './movieSlice'; 
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

    it('Fetch Nowplaying', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getNowPlaying.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getNowPlaying.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getNowPlaying()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    it('Fetch Upcoming', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getUpcoming.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getUpcoming.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getUpcoming()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    });

    it('Fetch Top Rated', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getTopRated.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getTopRated.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getTopRated()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    }); 

    it('Fetch Top Rated', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getTopRated.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getTopRated.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getTopRated()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    }); 

    it('Fetch Genre', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getGenre.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getGenre.fulfilled.type,
                payload: GENRE_TEST
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getGenre()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    }); 

    it('Fetch Search', async () => {

        const expectedActions = [
            { 
                meta: expect.anything(),
                type: getSearch.pending.type,
                payload: undefined,
            },
            {
                meta: expect.anything(),
                type: getSearch.fulfilled.type,
                payload: [MOVIE_TEST]
            }
        ];

        const store = mockStore(initialMovieState);

        return store.dispatch(getSearch()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })

    }); 

});
