import { TMDB_API_KEY } from "../../constantes/config";

export const getApiUrlTMDB = (endpoint: string): string => "https://api.themoviedb.org/3/" + endpoint + "?api_key=" + TMDB_API_KEY;

export const getNowPlayingMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/now_playing"));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

export const getUpcomingMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/upcoming"));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

export const getTopRatedMovies = async (page: number = 0) => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/top_rated"));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
    }
};

