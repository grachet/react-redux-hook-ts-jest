import RefreshIcon from '@mui/icons-material/Refresh';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { Dispatch } from 'redux';
import MovieCard from '../../app/components/MovieCard';
import { locationToMovieType } from '../../functions/helperFunctions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getGenre, getNowPlaying, getSearch, selectMovie, getTopRated, getUpcoming } from './movieSlice';
import { MovieKeyType, MovieState, MovieType } from "./movieTypes";

const dispatchGetMovie = (dispatch: Dispatch<any>, movieType: string) => {
    if (movieType === "toprated") {
        dispatch(getTopRated())
    } else if (movieType === "nowplaying") {
        dispatch(getNowPlaying())
    } else if (movieType === "upcoming") {
        dispatch(getUpcoming())
    }
}

function MovieList() {

    const { searchText }: { searchText?: string } = useParams();
    const location = useLocation();
    const movieType: MovieKeyType = locationToMovieType(location);
    const { [movieType]: movies, status, genre }: MovieState = useAppSelector(selectMovie);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!movies.length) {
            dispatchGetMovie(dispatch, movieType)
        }
    }, [dispatch, movies, movieType])

    useEffect(() => {
        if (!!searchText) {
            dispatch(getSearch(searchText))
        }
    }, [dispatch, searchText])

    useEffect(() => {
        if (!Object.keys(genre).length) {
            dispatch(getGenre())
        }
    }, [dispatch, genre])

    return (
        <Container sx={{ mt: 8, py: 4 }} maxWidth="xl">
            <Grid container spacing={4}>
                {!!searchText && status !== "loading" && !movies.length && <Grid item xs={12}   >
                    <Typography component="div" variant="button" color="primary" sx={{ textAlign: "center" }} >
                        Nothing found <SentimentVeryDissatisfiedIcon sx={{ verticalAlign: "middle" }} />
                    </Typography>
                </Grid>}
                {movies.map((movie: MovieType) => (
                    <Grid item key={movie?.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} genre={genre} />
                    </Grid>
                ))}
                {!searchText && status !== "loading" && <Grid item xs={12} >

                    <Button variant="outlined"
                        onClick={() => dispatchGetMovie(dispatch, movieType)}
                    >
                        <RefreshIcon sx={{ mr: 1 }} />
                        More
                    </Button>
                </Grid>}
            </Grid>
        </Container>
    );
}

export default MovieList;