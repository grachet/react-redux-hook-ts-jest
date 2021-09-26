import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    logout,
    selectAuth
} from './authSlice';

function LogoutUserAvatar() {

    const account = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    console.log(account)

    return (
        <IconButton size="large" color="inherit" onClick={() => dispatch(logout())}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </IconButton>
    );
}

export default LogoutUserAvatar;