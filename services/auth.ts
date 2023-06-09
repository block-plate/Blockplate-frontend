import {api} from "./common";
import {ApiResponse} from "@/types/api";
import {Profile} from "@/types/auth";

export const authApi = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body: {email: string, pwd: string}) => ({
                url: `/auth/login`,
                method: 'POST',
                body: JSON.stringify(body),
            }),
        }),

        signUp: build.mutation({
            query: (body: {
                email: string,
                pwd: string,
                name: string,
                account: string
            }) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: {
                    ...body,
                    type: 1
                }
            }),
        }),

        getProfile: build.query({
            query: ({jwt}) => {
                console.log("hello" + jwt);
                return {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `Authentication=${jwt}; Domain=localhost; Path=/; HttpOnly`
                    },
                    url: 'http://api.platechain.shop/api/auth/profile',
                    method: 'GET'
                }
            }
        }),
    }),
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetProfileQuery
} = authApi;