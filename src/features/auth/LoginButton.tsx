import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {
    login,
    loginAnonymous
} from './authSlice';

const GoogleButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[600],
    "&:hover": {
        backgroundColor: theme.palette.grey[300],
    }
}));

function LoginButton() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(login(true))
    }, [dispatch])

    return (
        <>
            <GoogleButton
                variant="contained"
                onClick={() => dispatch(login())}
            >
                <img alt="Google logo" src={process.env.PUBLIC_URL + "/assets/google_logo.svg"} style={{ marginRight: 10 }} />
                Sign in with Google
            </GoogleButton>
            <Button variant="outlined"
                onClick={() => dispatch(loginAnonymous())}>
                <BathtubIcon sx={{ mr: 1 }} /> Anonymous
            </Button>
        </>
    );
}

export default LoginButton;