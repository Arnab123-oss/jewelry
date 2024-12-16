import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { cartItem } from "../../types/types";


const initialState: cartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    }
}


export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex(item => item.productId === action.payload.productId)

            if (index !== -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);

            state.loading = false;

        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
            state.loading = false;
        },



        calculatePrice: (state) => {
            const subtotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

            state.subtotal = subtotal
            state.tax = Math.round(subtotal * 0.18)
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200
            state.total = (state.subtotal + state.tax + state.shippingCharges) - state.discount

            console.log((state.subtotal + state.tax + state.shippingCharges) - state.discount);
            
        },

        discountApplied: (state, action: PayloadAction<number>) => {
       
            state.loading = true;
            state.discount = action.payload;
            state.loading = false;
     

        },


    },


})


export const { addToCart, removeCartItem, calculatePrice, discountApplied } = cartReducer.actions