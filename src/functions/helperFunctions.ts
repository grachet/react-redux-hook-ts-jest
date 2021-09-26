import { Location } from 'history';
import { MovieKeyType } from '../features/movie/movieSlice';

export const locationToMovieType = (location: Location<unknown>): MovieKeyType => {
    const name = location.pathname.substring(1);
    return (name === "home" || name === "explore" || name === "subscription") ? name : "home";
}