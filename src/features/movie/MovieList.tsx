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
import {
    home, subscription, explore, selectMovie, MovieKeyType
} from './movieSlice';

const fetchByMovieType = {
    home,
    subscription,
    explore
}

function MovieList() {

    const location = useLocation();
    const MovieType: MovieKeyType = locationToMovieType(location);
    const { [MovieType]: Movies } = useAppSelector(selectMovie);

    const dispatch = useAppDispatch();

    const fetchMovie = fetchByMovieType[MovieType];

    // useEffect(() => {
    //     dispatch(fetchByMovieType[MovieType])
    // }, [dispatch])

    console.log(Movies);

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <button onClick={() => fetchMovie && dispatch(fetchMovie())}>More</button>
            <br />
            {JSON.stringify(Movies)}
            <Grid container spacing={4}>
                {/* {Movies.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    // pt: '56.25%', 
                                }}
                                image="https://source.unsplash.com/random"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Heading
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    This is a media card. You can use this section to describe the
                                    content.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}
            </Grid>
        </Container>
    );
}

export default MovieList;