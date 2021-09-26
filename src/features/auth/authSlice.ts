import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { gapiLogin, gapiLogout } from './authAPI';

const ANONYMOUS_ACCOUNT: AccountType = {
    email: "Anonymous",
    profilePictureURL: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
    fullName: "Anonymous",
    isAnonymous: true,
}

type AccountType = {
    email: string,
    profilePictureURL: string,
    fullName: string,
    isAnonymous: boolean,
}

export interface AuthState {
    account: null | AccountType;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    account: null,
    status: 'idle',
};

export const login = createAsyncThunk(
    'auth/login',
    async (onlyAlreadySigned: boolean = false) => {
        const response = await gapiLogin(onlyAlreadySigned);
        return {
            email: response.it.Tt,
            profilePictureURL: response.it.kK,
            fullName: response.it.Se,
            isAnonymous: false
        };
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { getState }) => {
        const { auth } = getState() as { auth: AuthState };
        if (!auth?.account?.isAnonymous) {
            await gapiLogout();
        }
        return null;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAnonymous: (state) => { state.account = ANONYMOUS_ACCOUNT },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.account = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.account = null;
            });
    },
});

export const { loginAnonymous } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.account;

export default authSlice.reducer;
