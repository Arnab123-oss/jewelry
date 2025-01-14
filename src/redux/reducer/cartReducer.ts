import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { cartItem, ShippingInfo } from "../../types/types";


const savedCartItems = localStorage.getItem("cartItems");
const savedShippingInfo = localStorage.getItem("shippingInfo");

const initialState: cartReducerInitialState = {
    loading: false,
    cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: savedShippingInfo
    ? JSON.parse(savedShippingInfo)
    :  {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
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

           localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
            state.loading = false;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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

        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;

            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        },
        resetCart: (state) => {
            // Clear cart and localStorage
            state.cartItems = [];
            state.subtotal = 0;
            state.tax = 0;
            state.shippingCharges = 0;
            state.discount = 0;
            state.total = 0;
            state.shippingInfo = {
                address: "",
                city: "",
                state: "",
                country: "",
                pinCode: "",
            };
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shippingInfo");
        },


    },


})


export const { addToCart, removeCartItem, calculatePrice, discountApplied ,saveShippingInfo,resetCart} = cartReducer.actions