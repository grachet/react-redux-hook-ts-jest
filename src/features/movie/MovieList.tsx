import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { locationToMovieType } from '../../functions/helperFunctions';
import { IMAGE_URL_TMDB } from './movieAPI';
import LinearProgress from '@mui/material/LinearProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    search, upcoming, nowplaying, toprated, selectMovie, MovieKeyType, MovieType
} from './movieSlice';
import { Button } from '@mui/material';

const fetchByMovieType = {
    search,
    upcoming,
    nowplaying,
    toprated,
}

function MovieList() {

    const location = useLocation();
    const MovieType: MovieKeyType = locationToMovieType(location);
    const { [MovieType]: movies, status } = useAppSelector(selectMovie);

    const dispatch = useAppDispatch();

    const fetchMovie = fetchByMovieType[MovieType];

    useEffect(() => {
        if (!movies.length) {
            dispatch(fetchMovie())
        }
    }, [dispatch, movies])

    console.log(movies);

    return (
        <>
            {status === 'loading' && <LinearProgress />}
            <Container sx={{ py: 4 }} maxWidth="xl">
                <Grid container spacing={4}>
                    {movies.map(({ id, original_title, overview, backdrop_path }: MovieType) => (
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
                                        {original_title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {overview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={12} >
                        <Button variant="outlined"
                            onClick={() => fetchMovie && dispatch(fetchMovie())}
                        >
                            <RefreshIcon sx={{ mr: 1 }} />
                            More
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default MovieList;