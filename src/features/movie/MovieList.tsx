import RefreshIcon from '@mui/icons-material/Refresh';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Button, CardHeader, Rating, Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import TextTruncate from 'react-text-truncate';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getBackdropFullURL, locationToMovieType } from '../../functions/helperFunctions';
import { getGenre, nowplaying, search, selectMovie, toprated, upcoming } from './movieSlice';
import { MovieKeyType, MovieType, MovieState } from "./movieTypes";

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
    const { [movieType]: movies, status, genre }: MovieState = useAppSelector(selectMovie);

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
                            <CardHeader
                                titleTypographyProps={{ variant: "subtitle2" }}
                                subheaderTypographyProps={{ variant: "button" }}
                                title={title}
                                subheader={<>
                                    {release_date}
                                    <Rating sx={{ float: "right" }} size="small" name="read-only" value={vote_average / 2} readOnly />
                                </>
                                }
                            />
                            <CardMedia
                                component="img"
                                sx={{ backgroundColor: (theme: Theme) => theme.palette.common.black }}
                                image={getBackdropFullURL(backdrop_path)}
                                alt="random"
                            />
                            <Box sx={{ flexGrow: 1, px: 1.5, pt: 1.5 }}>
                                <Typography
                                    sx={{ fontSize: 12, color: (theme: Theme) => theme.palette.text.secondary }}
                                >
                                    <TextTruncate
                                        line={3}
                                        element="span"
                                        truncateText="…"
                                        text={overview}
                                    />
                                </Typography>
                            </Box>
                            <Box sx={{ px: 1.5, pb: 0.5 }}>
                                <Typography key={id} variant="button" color="primary" sx={{ fontSize: 12 }} >
                                    {genre_ids.slice(0, 3).map((id: number) => genre[id]).join(" / ")}
                                </Typography>
                            </Box>
                        </Card>
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