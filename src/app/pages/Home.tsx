import EventNoteIcon from '@mui/icons-material/EventNote';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import TimerIcon from '@mui/icons-material/Timer';
import { IconButton, LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { APP_TITLE, PAGE_TITLES } from '../../constantes/constantes';
import LogoutUserAvatar from '../../features/auth/LogoutUserAvatar';
import MovieList from '../../features/movie/MovieList';
import { selectMovie } from '../../features/movie/movieSlice';
import { MovieKeyType } from '../../features/movie/movieTypes';
import { locationToMovieType } from '../../functions/helperFunctions';
import { useAppSelector } from '../../redux/hooks';
import SearchBar from '../components/SearchBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {

    const theme = useTheme();
    const matchePhone = !useMediaQuery(theme.breakpoints.up('sm'));

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const location = useLocation();
    const history = useHistory();
    const { status } = useAppSelector(selectMovie);
    const PageType: MovieKeyType = locationToMovieType(location);

    const changeMovieType = (MovieType: string) => {
        setOpenDrawer(false)
        history.push(MovieType)
    }

    return (
        < >
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton size="large" color="inherit" sx={{ mr: 4 }} onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    {!matchePhone && <>
                        <SlowMotionVideoIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            {APP_TITLE}
                            <Typography variant="button" color="textSecondary" component="span" sx={{ ml: 2 }}>
                                {PAGE_TITLES[PageType]}
                            </Typography>
                        </Typography>
                    </>}
                    <SearchBar />
                    <LogoutUserAvatar />
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <main  >
                <MovieList />
            </main>
            <StyledDrawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem button onClick={() => changeMovieType("/toprated")}>
                        <ListItemIcon>
                            <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Top rated"} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => changeMovieType("/nowplaying")}>
                        <ListItemIcon>
                            <TimerIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Now Playing"} />
                    </ListItem>
                    <ListItem button onClick={() => changeMovieType("/upcoming")} >
                        <ListItemIcon>
                            < EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Up Comming"} />
                    </ListItem>
                </List>
            </StyledDrawer >
        </>
    );
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 300,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 300,
        boxSizing: 'border-box',
    },
}));