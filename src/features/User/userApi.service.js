import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
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
    keepUnusedDataFor: 60,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ page, limit, role, email }) =>
                `/api/v1/users?${page ? `page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${role ? `&role=${role}` : ""}${email ? `&email=${email}` : ""}`,
            providesTags: ["User"],
        }),
        updateRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/api/v1/users/update-role/${id}`,
                method: "PUT",
                body: {
                    role,
                },
            }),
            invalidatesTags: ["User"],
        }),
        getAllRoles: builder.query({
            query: () => `/api/v1/roles`,
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/users/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useLazyGetAllUsersQuery, useUpdateRoleMutation, useGetAllRolesQuery, useDeleteUserMutation } = userApi;
