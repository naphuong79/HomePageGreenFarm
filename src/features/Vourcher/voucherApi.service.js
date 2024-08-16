import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voucherApi = createApi({
    reducerPath: "voucherApi",
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
    tagTypes: ["Voucher"],
    endpoints: (builder) => ({
        getAllVouchers: builder.query({
            query: ({ page, limit}) => ({
                url: `/api/v1/vouchers?${page ? `&page=${page}` : ""}${
                    limit ? `&limit=${limit}` : ""
                }`,
            }),
            providesTags: ["Voucher"],
        }),
        deleteVoucher: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/vouchers/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Voucher"],
        }),
        createVoucher: builder.mutation({
            query: (body) => ({
                url: "/api/v1/vouchers/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Voucher"],
        }),
        updateVoucher: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/v1/vouchers/update/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Voucher"],
        }),
    }),
});

export const { useGetAllVouchersQuery, useLazyGetAllVouchersQuery, useDeleteVoucherMutation, useCreateVoucherMutation, useUpdateVoucherMutation} = voucherApi;