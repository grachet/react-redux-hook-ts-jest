import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import LogoutUserAvatar from '../../../features/auth/LogoutUserAvatar';

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
        // vertical padding + font size from searchIcon
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const location = useLocation();
    const history = useHistory();
    const videoType = location.pathname.substring(1);

    const changeVideoType = (videoType: string) => {
        setOpenDrawer(false)
        history.push(videoType)
    }

    return (
        < >
            <AppBar position="relative">
                <Toolbar>
                    <IconButton size="large" color="inherit" sx={{ mr: 4 }} onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <SlowMotionVideoIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        VideoTube
                        <Typography variant="button" color="textSecondary" component="span" sx={{ ml: 2 }}>
                            {videoType}
                        </Typography>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <LogoutUserAvatar />
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{ py: 8 }} maxWidth="xl">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
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
                        ))}
                    </Grid>
                </Container>
            </main>
            <StyledDrawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem button onClick={() => changeVideoType("home")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <ListItem button onClick={() => changeVideoType("explore")}>
                        <ListItemIcon>
                            <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Explore"} />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => changeVideoType("subscription")} >
                        <ListItemIcon>
                            <SubscriptionsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Subscription"} />
                    </ListItem>
                </List>
            </StyledDrawer >
        </>
    );
}