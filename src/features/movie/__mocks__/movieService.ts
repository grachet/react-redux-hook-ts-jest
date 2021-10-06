import { GENRE_ARRAY_TEST, MOVIE_TEST } from "../../../constantes/testConstantes";
import { GenreAPIType, MovieType } from "../movieTypes";

 class MovieService {

    getApiUrlTMDB = (endpoint: string, page: number | string = 0): string => "";

    async getGenreIdMovies (): Promise<GenreAPIType[]>   {
        return GENRE_ARRAY_TEST;
    };
    
    async getSearchMovies (query: string, page: number = 0): Promise<{ results: MovieType[] } | null>   {
        return {results:[MOVIE_TEST]};
    };
    
    async getNowPlayingMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        return {results:[MOVIE_TEST]};
    };
    
    async getUpcomingMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        return {results:[MOVIE_TEST]};
    };
    
    async  getTopRatedMovies (page: number = 0): Promise<{ results: MovieType[] } | null>   {
        return {results:[MOVIE_TEST]};
    };
} 

export default new MovieService();