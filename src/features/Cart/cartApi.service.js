import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
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
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (body) => ({
                url: `/api/v1/orders/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        getAllOrders: builder.query({
            query: ({ page, limit, code, status }) =>
                `/api/v1/orders?${page ? `page=${page}` : ""}${
                    limit ? `&limit=${limit}` : ""
                }${code ? `&code=${code}` : ""}${status ? `&status=${status}` : ""}`,
            providesTags: ["Cart"],
        }),
        getOneOrder: builder.query({
            query: (id) => `/api/v1/orders/${id}`,
        }),
        updateStatusOrder: builder.mutation({
            query: ({ id, status }) => ({
                url: `/api/v1/orders/update-status/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Cart"],
        }),
        getOrdersByUser: builder.query({
            query: ({ id, page, limit, code, status }) =>
                `/api/v1/orders/user/${id}?${page ? `page=${page}` : ""}${
                    limit ? `&limit=${limit}` : ""
                }${code ? `&code=${code}` : ""}${status ? `&status=${status}` : ""}`,
            providesTags: ["Cart"],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useLazyGetAllOrdersQuery,
    useLazyGetOneOrderQuery,
    useUpdateStatusOrderMutation,
    useLazyGetOrdersByUserQuery,
} = cartApi;
