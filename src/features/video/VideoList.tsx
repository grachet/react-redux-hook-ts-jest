import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { default as React, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { locationToVideoType } from '../../functions/helperFunctions';
import {
    home, subscription, explore, selectVideo, VideoKeyType
} from './videoSlice';

const fetchByVideoType = {
    home,
    subscription,
    explore
}

function VideoList() {

    const location = useLocation();
    const videoType: VideoKeyType = locationToVideoType(location);
    const { [videoType]: videos } = useAppSelector(selectVideo);

    const dispatch = useAppDispatch();

    const fetchVideo = fetchByVideoType[videoType];

    // useEffect(() => {
    //     dispatch(fetchByVideoType[videoType])
    // }, [dispatch])

    console.log(videos);

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <button onClick={() => fetchVideo && dispatch(fetchVideo())}>More</button>
            <br />
            {JSON.stringify(videos)}
            <Grid container spacing={4}>
                {/* {videos.map((card) => (
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

export default VideoList;