import { AccountType, GapiType, ResponseLoginGapiType } from "../features/auth/authTypes";
import { GenreType, MovieType } from "../features/movie/movieTypes";

export const ACCOUNT_TEST: AccountType = {
    email: "guillaume.rachet@gmail.com",
    profilePictureURL: "test",
    fullName: "Guillaume Rachet",
    isAnonymous: false,
};

export const MOVIE_TEST: MovieType = {
    "adult": false,
    "backdrop_path": "/gNBCvtYyGPbjPCT1k3MvJuNuXR6.jpg",
    "genre_ids": [
        35,
        18,
        10749
    ],
    "id": 19404,
    "original_language": "hi",
    "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
    "overview": "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
    "popularity": 28.189,
    "poster_path": "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    "release_date": "1995-10-20",
    "title": "Dilwale Dulhania Le Jayenge",
    "video": false,
    "vote_average": 8.8,
    "vote_count": 3146
};

export const GENRE_TEST: GenreType = {
    35: "Comedy",
    18: "Drama",
    10749: "Romance",
};

export const GAPI_LOGIN_USER_TEST: ResponseLoginGapiType = {
    it: {
        Tt: "guillaume.rachet@gmail.com",
        kK: "testurl",
        Se: "Guillaume Rachet",
    }
};

export const GAPI_MOCK_TEST: GapiType = {
    load: (_, f) => f(),
    auth2: {
        init: (args: { [key: string]: string | number }) => { return Promise.resolve({}); },
        getAuthInstance: () => ({
            currentUser: {
                Xd: GAPI_LOGIN_USER_TEST
            },
            isSignedIn: {
                get: () => true,
            },
            signIn: () => { return Promise.resolve(GAPI_LOGIN_USER_TEST); },
            signOut: () => { return Promise.resolve(null); },
        }),
    }
};

