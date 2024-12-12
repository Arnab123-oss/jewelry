import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, MessageResponse, NewProductRequest, SearchProductRequest, SearchProductResponse } from "../../types/api-types";
// import { server } from "../store"
// import { MessageResponse, UserResponse } from "../../types/api-types"
// import { User } from "../../types/types"
// import axios from "axios"


export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    endpoints: (builder) => ({
        latestProduct: builder.query<AllProductsResponse, string>({ query: () => "latest" }),

        allProducts: builder.query<AllProductsResponse, string>({ query: (id) => `admin-products?id=${id}` }),

        categories: builder.query<CategoriesResponse, string>({ query: () => "categories" }),

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

        }),

        createProduct: builder.mutation<MessageResponse,NewProductRequest>({
            query: ({ formdata, id }) => (
                {
                    url: `new?id=${id}`,
                    method: "POST",
                    body: formdata,
                }
            )
        }),
    })
})


export const { useLatestProductQuery, useAllProductsQuery, useCategoriesQuery, useSearchProductsQuery,useCreateProductMutation } = productAPI


