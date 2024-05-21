import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from "./user/userSlice.js";
import {userAPI} from "./user/userAPI.js";
import {adminAPI} from "./admin/adminAPI.js";
import {studentAPI} from "./student/studentAPI.js";

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [studentAPI.reducerPath]: studentAPI.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userAPI.middleware)
            .concat(studentAPI.middleware)
            .concat(adminAPI.middleware)
});

