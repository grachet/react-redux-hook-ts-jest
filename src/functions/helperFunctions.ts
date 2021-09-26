import { Location } from 'history';
import { MovieKeyType } from '../features/movie/movieSlice';

export const locationToMovieType = (location: Location<unknown>): MovieKeyType => {
    const name = location.pathname.substring(1);
    if (name === "upcoming" || name === "nowplaying" || name === "toprated") {
        return name;
    } else {
        return "search";
    }
}