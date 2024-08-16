import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token =
                getState().auth?.loggedIn && getState().auth?.accessToken.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ fullname, email, password }) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: { fullname: fullname, email: email, password: password },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: { email: email, password: password },
            }),
        }),
        LoginGoogle: builder.mutation({
            query: ({ idToken, clientId }) => ({
                url: "/api/v1/auth/google/verify",
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: { idToken: idToken, clientId: clientId },
            }),
        }),
        getTokenFromRefreshToken: builder.mutation({
            query: ({ token }) => ({
                url: "api/auth/refresh",
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: { token: token },
            }),
        }),
    }),
});

export const {
    useLoginGoogleMutation,
    useGetTokenFromRefreshTokenMutation,
    useRegisterMutation,
    useLoginMutation,
} = authApi;
