import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";
import { dashboardAPI } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializableCheck if needed (e.g., for non-serializable objects like Date)
        }).concat(userAPI.middleware,
            productAPI.middleware,
            orderAPI.middleware,
            dashboardAPI.middleware), // Combine default middleware with userAPI middleware
})

export type RootState = ReturnType<typeof store.getState>