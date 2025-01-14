import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductDetailsResponse, SearchProductRequest, SearchProductResponse, UpdateProductRequest } from "../../types/api-types";
// import { server } from "../store"
// import { MessageResponse, UserResponse } from "../../types/api-types"
// import { User } from "../../types/types"
// import axios from "axios"


export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProduct: builder.query<AllProductsResponse, string>({
            query: () => "latest",
            providesTags: ["product"],
        }),

        allProducts: builder.query<AllProductsResponse, string>({
            query: (id) => `admin-products?id=${id}`,
            providesTags: ["product"],
        }),

        categories: builder.query<CategoriesResponse, string>({
            query: () => "categories",
            providesTags: ["product"],
        }),

        searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
            query: ({ price, search, sort, category, page }) => {

                let base = `all?search=${search}&page=${page}`;

                // if (price) base += `&price=${price}`;
                if (price !== undefined && price !== null) base += `&price=${price}`;
                if (sort) base += `&sort=${sort}`;
                if (category) base += `&category=${category}`;


                return base;
                //  return `all?page=${page}&search=${search}`
            },
            providesTags: ["product"],

        }),

        productDetails: builder.query<ProductDetailsResponse, string>({
            query: (id) => id,
            providesTags: ["product"],
        }),

        createProduct: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({ formdata, id }) => (
                {
                    url: `new?id=${id}`,
                    method: "POST",
                    body: formdata,
                }),
            invalidatesTags: ["product"]
        }),


        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({ formdata, userId, productId }) => (
                {
                    url: `${productId}?id=${userId}`,
                    method: "PUT",
                    body: formdata,
                }),
            invalidatesTags: ["product"]
        }),

        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({ userId, productId }) => (
                {
                    url: `${productId}?id=${userId}`,
                    method: "DELETE",

                }),
            invalidatesTags: ["product"]
        }),
    })
})


export const {
    useLatestProductQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useCreateProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productAPI


