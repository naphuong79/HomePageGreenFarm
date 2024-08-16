import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.loggedIn && getState().auth?.accessToken.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, limit, category, brand, name }) => ({
        url: `/api/v1/products?${category ? `category=${category}` : ''}${brand ?  `&brand=${brand}` : ''}${page ? `&page=${page}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${name ? `&name=${name}` : ''}`,
      }),
      providesTags: ['Product'],
    }),
    getProductBySlug: builder.query({
      query: (slug) => `/api/v1/products/slug/${slug}`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/api/v1/products/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/products/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    getOneProduct: builder.query({
      query: ({ id }) => `/api/v1/products/${id}`,
      providesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/products/update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadImage: builder.mutation({
      query: ({ body }) => ({
        url: `/api/v1/upload/file`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useLazyGetAllProductsQuery,
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useLazyGetOneProductQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} = productApi;
