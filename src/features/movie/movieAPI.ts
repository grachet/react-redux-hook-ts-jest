import { TMDB_API_KEY } from "../../constantes/config";
import { API_URL_TMDB } from "../../constantes/textConstantes";
import { GenreAPIType, MovieType } from "./movieTypes";

export const getApiUrlTMDB = (endpoint: string, page: number | string = 0): string => API_URL_TMDB + endpoint + "?api_key=" + TMDB_API_KEY + "&page=" + page;

export const getSearchApiUrlTMDB = (page: number | string = 0, query: string = ""): string => API_URL_TMDB + "search/movie?api_key=" + TMDB_API_KEY + "&query=" + query + "&page=" + page;

export const getGenreIdMovies = async (): Promise<GenreAPIType[]> => {
    try {
        const rep = await fetch(API_URL_TMDB + "genre/movie/list?api_key=" + TMDB_API_KEY);
        const json = await rep.json()
        return json.genres;
    } catch (error: unknown) {
        console.error(error)
        return [];
    }
};

export const getSearchMovies = async (query: string, page: number = 0): Promise<{ results: MovieType[] } | null> => {
    try {
        const rep = await fetch(getSearchApiUrlTMDB(page, query));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
        return null;
    }
};

export const getNowPlayingMovies = async (page: number = 0): Promise<{ results: MovieType[] } | null> => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/now_playing", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
        return null;
    }
};

export const getUpcomingMovies = async (page: number = 0): Promise<{ results: MovieType[] } | null> => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/upcoming", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
        return null;
    }
};

export const getTopRatedMovies = async (page: number = 0): Promise<{ results: MovieType[] } | null> => {
    try {
        const rep = await fetch(getApiUrlTMDB("movie/top_rated", page));
        const movies = await rep.json()
        return movies
    } catch (error: unknown) {
        console.error(error)
        return null;
    }
};

