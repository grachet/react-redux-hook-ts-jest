import { Box, CardActionArea, CardContent, CardHeader, Rating, Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import TextTruncate from 'react-text-truncate';
import { GenreType, MovieType } from '../../features/movie/movieTypes';
import { getBackdropFullURL } from '../../functions/helperFunctions';
import MovieDialogue from './MovieDialogue';

type MovieCardProps = {
    movie: MovieType,
    genre: GenreType,
}

function MovieCard({ movie, genre }: MovieCardProps) {
    const { title, overview, backdrop_path, vote_average, release_date }: MovieType = movie;

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <StyledCard >
                <CardActionArea onClick={() => setOpen(true)}>
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
                    <CardContent>
                        <Box sx={{ color: (theme: Theme) => theme.palette.text.secondary }}>
                            <TextTruncate
                                line={2}
                                element="span"
                                truncateText="…"
                                text={overview}
                            />
                        </ Box>
                    </CardContent>
                </CardActionArea>
            </StyledCard>
            <MovieDialogue movie={movie} genre={genre} open={open} onClose={() => setOpen(false)} />
        </>
    );
}

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

export default MovieCard;