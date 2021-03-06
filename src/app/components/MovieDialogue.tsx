import { Box, Grid, Rating, CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GenreType, MovieType } from '../../features/movie/movieTypes';
import { getPosterFullURL } from '../../functions/helperFunctions';

type MovieDialogueProps = {
    movie: MovieType,
    genre: GenreType,
    open: boolean,
    onClose: () => void,
}

function MovieDialogue({ movie, genre, open, onClose }: MovieDialogueProps) {
    const { id, title, overview, vote_average, poster_path, release_date, genre_ids }: MovieType = movie;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="dialog-movie"
            aria-describedby="dialog-movie-description"
            fullWidth
            maxWidth="md"
        >
            <Grid container  >
                {<Grid item xs={12} sm={4}>
                    <CardMedia
                        height="100%"
                        component="img"
                        image={getPosterFullURL(poster_path)}
                        alt="Poster"
                    />
                </Grid>}
                <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <DialogTitle id="dialog-movie">
                            {title}
                            <Box>
                                <Typography variant="subtitle1"   >
                                    {release_date}
                                    <Rating sx={{ float: "right" }} size="small" name="read-only" value={vote_average / 2} readOnly />
                                </Typography>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="dialog-movie-description">
                                {overview}
                            </DialogContentText>
                            <DialogContentText sx={{ mt: 2 }} id="dialog-movie-description">
                                <Typography key={id} variant="button" color="primary"  >
                                    {genre_ids.slice(0, 3).map((id: number) => genre[id]).join(" / ")}
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                    </Box>
                    <DialogActions>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog >
    );
}

export default MovieDialogue;