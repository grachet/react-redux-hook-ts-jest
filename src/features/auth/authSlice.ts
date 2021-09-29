import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ANONYMOUS_ACCOUNT } from "../../constantes/constantes";
import authService from './authService';
import { AccountType, AuthState } from './authTypes';

const initialState: AuthState = {
    account: null,
    status: 'idle',
};

export const login = createAsyncThunk(
    'auth/login',
    async (onlyAlreadySigned: boolean = false): Promise<AccountType | null> => {
        const response = await authService.gapiLogin(onlyAlreadySigned);
        if (response) {
            return {
                email: response?.it.Tt,
                profilePictureURL: response?.it.kK,
                fullName: response?.it.Se,
                isAnonymous: false
            };
        } else {
            return null
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { getState }): Promise<null> => {
        const { auth } = getState() as { auth: AuthState };
        if (!auth?.account?.isAnonymous) {
            await authService.gapiLogout();
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
