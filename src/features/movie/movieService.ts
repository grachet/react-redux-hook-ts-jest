import { TMDB_API_KEY } from "../../constantes/config";
import { API_URL_TMDB } from "../../constantes/constantes";
import { GenreAPIType, MovieType } from "./movieTypes";

class MovieService {

    getApiUrlTMDB = (endpoint: string, page: number | string = 0): string => `${API_URL_TMDB + endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;

    async getGenreIdMovies (): Promise<GenreAPIType[]>   {
        try {
            const rep = await fetch(`${API_URL_TMDB}genre/movie/list?api_key=${TMDB_API_KEY}`);
            const json = await rep.json()
            return json.genres;
        } catch (error: unknown) {
            console.error(error)
            return [];
        }
    };
    
    async getSearchMovies (query: string, page: number = 0): Promise<{ results: MovieType[] } | null>   {
        try {
            const rep = await fetch(`${API_URL_TMDB}search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`);
            const movies = await rep.json()
            return movies
        } catch (error: unknown) {
            console.error(error)
            return null;
        }
    };
    
    async getNowPlayingMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        try {
            const rep = await fetch(this.getApiUrlTMDB("movie/now_playing", page));
            const movies = await rep.json()
            return movies
        } catch (error: unknown) {
            console.error(error)
            return null;
        }
    };
    
    async getUpcomingMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        try {
            const rep = await fetch(this.getApiUrlTMDB("movie/upcoming", page));
            const movies = await rep.json()
            return movies
        } catch (error: unknown) {
            console.error(error)
            return null;
        }
    };
    
    async  getTopRatedMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        try {
            const rep = await fetch(this.getApiUrlTMDB("movie/top_rated", page));
            const movies = await rep.json()
            return movies
        } catch (error: unknown) {
            console.error(error)
            return null;
        }
    };
} 

export default new MovieService();