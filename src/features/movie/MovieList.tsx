import RefreshIcon from '@mui/icons-material/Refresh';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { locationToMovieType } from '../../functions/helperFunctions';
import { IMAGE_URL_TMDB } from './movieAPI';
import { MovieKeyType, MovieType, nowplaying, search, selectMovie, toprated, upcoming, getGenre } from './movieSlice';

const dispatchGetMovie = (dispatch: Dispatch<any>, movieType: string) => {
    if (movieType === "toprated") {
        dispatch(toprated())
    } else if (movieType === "nowplaying") {
        dispatch(nowplaying())
    } else if (movieType === "upcoming") {
        dispatch(upcoming())
    }
}

function MovieList() {

    const { searchText }: { searchText?: string } = useParams();
    const location = useLocation();
    const movieType: MovieKeyType = locationToMovieType(location);
    const { [movieType]: movies, status, genre } = useAppSelector(selectMovie);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!movies.length) {
            dispatchGetMovie(dispatch, movieType)
        }
    }, [dispatch, movies, movieType])

    useEffect(() => {
        if (!!searchText) {
            dispatch(search(searchText))
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
                {movies.map(({ id, title, overview, backdrop_path, vote_average, release_date, genre_ids }: MovieType) => (
                    <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    // pt: '56.25%', 
                                }}
                                image={IMAGE_URL_TMDB + backdrop_path}

                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {overview}
                                </Typography>
                                {vote_average}
                                {release_date}

                                {genre_ids.map((id: number) => genre[id])}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {!searchText && <Grid item xs={12} >

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