import {createApi} from "@reduxjs/toolkit/query/react";
import {logoutUser, setUser} from "./userSlice.js";
import {getBaseQuery} from "../config.js";

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: getBaseQuery('auth'),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => '/verify',
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser({user: data}))
                } catch (e) {
                    dispatch(logoutUser())
                }
            }
        }),

        userLogin: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data))
                } catch (e) {
                    dispatch(logoutUser())
                }
            }
        }),

        userSignup: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
        }),


    }),
});

export const {
    useGetMeQuery,
    useUserSignupMutation,
    useUserLoginMutation
} = userAPI;
