import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Tooltip from '@mui/material/Tooltip';
import {
    logout,
    selectAuth
} from './authSlice';
import { AccountType } from './authTypes';

function LogoutUserAvatar() {

    const account: AccountType | null = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    return (
        <Tooltip title={"Logout from " + account?.email}>
            <IconButton size="large" color="inherit" onClick={() => dispatch(logout())}>
                <Avatar alt={account?.fullName} src={account?.profilePictureURL} />
            </IconButton>
        </Tooltip>
    );
}

export default LogoutUserAvatar;