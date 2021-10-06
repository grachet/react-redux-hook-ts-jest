import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ANONYMOUS_ACCOUNT } from "../../constantes/constantes";
import authService from './authService';
import { AccountType, AuthState } from './authTypes';

export const initialAuthState: AuthState = {
    account: null,
    status: 'idle',
};

export const login = createAsyncThunk(
    'auth/login',
    async (onlyAlreadySigned: boolean = false): Promise<AccountType | null> => {
        return await authService.gapiLogin(onlyAlreadySigned); 
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (): Promise<null> => {
        await authService.gapiLogout(); 
        return null;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
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
