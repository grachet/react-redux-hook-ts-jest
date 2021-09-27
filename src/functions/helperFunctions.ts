import { Location } from 'history';
import { IMAGE_URL_TMDB, URL_PLACEHOLDER } from '../constantes/textConstantes';
import { MovieKeyType } from '../features/movie/movieTypes';

export const locationToMovieType = (location: Location<unknown>): MovieKeyType => {
    const name: string = location.pathname.substring(1);
    if (name === "upcoming" || name === "nowplaying" || name === "toprated") {
        return name;
    } else {
        return "search";
    }
}

export const getBackdropFullURL = (endUrl?: string): string => {
    if (endUrl) {
        return IMAGE_URL_TMDB + endUrl;
    } else {
        return URL_PLACEHOLDER;
    }
}