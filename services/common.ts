import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {HYDRATE} from 'next-redux-wrapper';
import {AppState} from 'features';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/`,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        prepareHeaders: (headers, store) => {
            const accessToken = (store.getState() as AppState).auth.accessToken;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers;
        },
        paramsSerializer: params => {
            const ret = [];
            for (let [key, value] of Object.entries(params)) {
                if(value === null || value === undefined) continue;
                if (Array.isArray(value)) {
                    for (let v of value) {
                        ret.push(`${key}=${v}`)
                    }
                } else {
                    ret.push(`${key}=${value}`)
                }
            }
            return ret.join("&");
        },
    }),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({

    }),
});

export const {} = api;