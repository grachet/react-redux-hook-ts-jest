import { TMDB_API_KEY } from "../../constantes/config";

export const getApiUrlTMDB = (endpoint: string, page: number | string = 0): string => "https://api.themoviedb.org/3/" + endpoint + "?api_key=" + TMDB_API_KEY + "&page=" + page;

export const IMAGE_URL_TMDB: string = "http://image.tmdb.org/t/p/w500/";

export const getNowPlayingMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/now_playing", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

export const getUpcomingMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/upcoming", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

export const getTopRatedMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/top_rated", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

