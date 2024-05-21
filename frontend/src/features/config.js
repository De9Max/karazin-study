import {fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

export const serverURL = 'http://127.0.0.1:5050'

export const getBaseQuery = (path = '') => {
    return fetchBaseQuery({
        baseUrl: `${serverURL}/${path}`,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().user.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    })
}