import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { APP_TITLE, LOGIN_SUBTITLE, LOGIN_TITLE, MY_NAME, PORTFOLIO_URL } from '../../../constantes/textConstantes';
import LoginButton from '../../../features/auth/LoginButton';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={PORTFOLIO_URL}>
                {MY_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Home() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: "100vh"
        }}>
            <AppBar position="relative">
                <Toolbar>
                    <SlowMotionVideoIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        {APP_TITLE}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xl" sx={{ flexGrow: 1 }}>
                <Container maxWidth="sm" sx={{ mt: 8 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {APP_TITLE}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {LOGIN_TITLE}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph>
                        {LOGIN_SUBTITLE}
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <LoginButton />
                    </Stack>
                </Container>
            </Container >
            <Box sx={{ p: 6 }} component="footer">
                <Copyright />
            </Box>
        </Box >
    );
}