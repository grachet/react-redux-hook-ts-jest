import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getHomeVideos, getExploreVideos, getSubscriptionVideos } from './videoAPI';

export type VideoKeyType = "home" | "explore" | "subscription";
export type VideoType = number;

export interface VideoState {
    home: VideoType[];
    subscription: VideoType[];
    explore: VideoType[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: VideoState = {
    home: [],
    subscription: [],
    explore: [],
    status: 'idle',
};

export const home = createAsyncThunk(
    'video/home',
    async () => {
        const response = await getHomeVideos();
        console.log(response)
        return response.data;
    }
);

export const subscription = createAsyncThunk(
    'video/subscription',
    async () => {
        const response = await getSubscriptionVideos();
        console.log(response)
        return response.data;
    }
);

export const explore = createAsyncThunk(
    'video/explore',
    async () => {
        const response = await getExploreVideos();
        console.log(response)
        return response.data;
    }
);

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(home.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(home.fulfilled, (state, action) => {
                state.status = 'idle';
                state.home = [...state.home, ...action.payload];
            })
            .addCase(subscription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(subscription.fulfilled, (state, action) => {
                state.status = 'idle';
                state.subscription = [...state.subscription, ...action.payload];
            })
            .addCase(explore.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(explore.fulfilled, (state, action) => {
                state.status = 'idle';
                state.explore = [...state.explore, ...action.payload];
            })
    },
});

export const selectVideo = (state: RootState) => state.video;

export default videoSlice.reducer;