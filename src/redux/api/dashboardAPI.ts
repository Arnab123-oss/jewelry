import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const dashboardAPI = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
    }),

    endpoints: (builder) => ({
        stats: builder.query<string, string>({
            query: (id) => `stats?id=${id}`
        }),
        pie: builder.query<string, string>({
            query: (id) => `pie?id=${id}`
        }),
        bar: builder.query<string, string>({
            query: (id) => `bar?id=${id}`
        }),
        line: builder.query<string, string>({
            query: (id) => `line?id=${id}`
        }),


    }),
})

export const {
    useBarQuery,
    useLineQuery,
    useStatsQuery,
    usePieQuery
} = dashboardAPI;