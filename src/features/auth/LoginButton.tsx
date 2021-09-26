import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    login,
    selectAuth
} from './authSlice';

const GoogleButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[600],
    ["&:hover"]: {
        backgroundColor: theme.palette.grey[300],
    }
}));

function LoginButton() {
    const account = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    console.log(account)

    return (
        <GoogleButton
            // disabled={!loaded}
            variant="contained"
            onClick={() => dispatch(login())}
        >
            <img src={process.env.PUBLIC_URL + "/assets/google_logo.svg"} style={{ marginRight: 10 }} />
            Sign in with Google
        </GoogleButton>
    );
}

export default LoginButton;