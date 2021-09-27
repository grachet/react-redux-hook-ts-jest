import EventNoteIcon from '@mui/icons-material/EventNote';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import TimerIcon from '@mui/icons-material/Timer';
import { IconButton, LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { EventHandler, KeyboardEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { APP_TITLE, PAGE_TITLES } from '../../../constantes/constantes';
import LogoutUserAvatar from '../../../features/auth/LogoutUserAvatar';
import MovieList from '../../../features/movie/MovieList';
import { selectMovie } from '../../../features/movie/movieSlice';
import { MovieKeyType } from '../../../features/movie/movieTypes';
import { useAppSelector } from '../../../redux/hooks';
import { locationToMovieType } from './../../../functions/helperFunctions';

export default function Home() {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const location = useLocation();
    const history = useHistory();
    const { status } = useAppSelector(selectMovie);
    const PageType: MovieKeyType = locationToMovieType(location);

    const changeMovieType = (MovieType: string) => {
        setOpenDrawer(false)
        history.push(MovieType)
    }

    const searchPressEnter: EventHandler<KeyboardEvent<HTMLInputElement>> = (e) => {
        if (e.key === 'Enter') {
            history.push("/search/" + (e.target as HTMLInputElement).value)
        }
    }

    return (
        < >
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton size="large" color="inherit" sx={{ mr: 4 }} onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <SlowMotionVideoIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        {APP_TITLE}
                        <Typography variant="button" color="textSecondary" component="span" sx={{ ml: 2 }}>
                            {PAGE_TITLES[PageType]}
                        </Typography>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onKeyPress={searchPressEnter}
                            placeholder="Search ⏎"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 300,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 300,
        boxSizing: 'border-box',
    },
}));