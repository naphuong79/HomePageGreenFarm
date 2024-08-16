import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
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
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: ({ page, limit}) => ({
                url: `/api/v1/categories?${page ? `&page=${page}` : ""}${
                    limit ? `&limit=${limit}` : ""
                }`,
            }),
            providesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/categories/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: "/api/v1/categories/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/v1/categories/update/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),

    }),
});

export const { useGetAllCategoriesQuery, useLazyGetAllCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation  } = categoryApi;
