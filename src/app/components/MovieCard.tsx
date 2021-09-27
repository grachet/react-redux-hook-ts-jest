import { Box, CardHeader, Rating, Theme } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import TextTruncate from 'react-text-truncate';
import { GenreType, MovieType } from '../../features/movie/movieTypes';
import { getBackdropFullURL } from '../../functions/helperFunctions';

type MovieCardProps = {
    movie: MovieType,
    genre: GenreType,
}

function MovieCard({ movie, genre }: MovieCardProps) {
    const { id, title, overview, backdrop_path, vote_average, release_date, genre_ids }: MovieType = movie;
    return (
        <StyledCard >
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
        </StyledCard>
    );
}

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

export default MovieCard;