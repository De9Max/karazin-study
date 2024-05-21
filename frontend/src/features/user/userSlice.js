import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem('token')
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            if(action.payload.access_token !== undefined) {
                state.token = action.payload.access_token;
                localStorage.setItem('token', action.payload.access_token);
            }
        },
        logoutUser: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
