import { AccountType } from "../features/auth/authTypes";

export const APP_TITLE = "Movies";
export const MY_NAME = "Guillaume Rachet";
export const LOGIN_TITLE = "Unlimited movies, TV shows, and more. Watch anywhere.";

export const REPOSITORY_URL = "https://github.com/grachet/react-redux-hook-ts-jest";
export const PORTFOLIO_URL = "https://grachet.github.io/";

export const API_URL_TMDB = "https://api.themoviedb.org/3/";
export const IMAGE_URL_TMDB: string = "https://image.tmdb.org/t/p/w500/";

export const URL_PLACEHOLDER_BACKDROP = process.env.PUBLIC_URL + "/assets/placeholder_background.png";
export const URL_PLACEHOLDER_POSTER = process.env.PUBLIC_URL + "/assets/placeholder_background.png";

export const PAGE_TITLES: { [key: string]: string } = {
    "search": "Search",
    "toprated": "Top rated",
    "nowplaying": "Now Playing",
    "upcoming": "Up Comming",
}

export const ANONYMOUS_PROFILE_PICTURE_URL = "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989";
export const ANONYMOUS_ACCOUNT: AccountType = {
    email: "Anonymous",
    profilePictureURL: ANONYMOUS_PROFILE_PICTURE_URL,
    fullName: "Anonymous",
    isAnonymous: true,
}