import { Location } from 'history';
import { MovieKeyType } from '../features/movie/movieSlice';

export const locationToMovieType = (location: Location<unknown>): MovieKeyType => {
    const name = location.pathname.substring(1);
    return (name === "search" || name === "upcoming" || name === "nowplaying" || name === "toprated") ? name : "nowplaying";
}