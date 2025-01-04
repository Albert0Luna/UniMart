import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allProducts = createApi({
  reducerPath: "allProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "https://dummyjson.com/products"
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = allProducts;
