import { cartItem, Order, Product, ShippingInfo, User } from "./types";


export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    }
}



export type MessageResponse = {
    success: boolean;
    message: string;
}

export type UserResponse = {
    success: boolean;
    user: User
}

export type AllProductsResponse = {
    success: boolean;
    products: Product[]
}

export type CategoriesResponse = {
    success: boolean;
    categories: string[]
}


export type SearchProductResponse = {
    success: boolean;
    products: Product[];
    totaPage: number;
}

export type SearchProductRequest = {
    price: number;
    page: number
    category: string
    search: string
    sort: string
}


export type ProductDetailsResponse = {
    success: boolean;
    product: Product;
}


export type NewProductRequest = {
    id: string;
    formdata: FormData
}


export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formdata: FormData;
}

export type DeleteProductRequest = {
    userId: string;
    productId: string;
}

export type NewOrderRequest = {
    orderItems: cartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: ShippingInfo;
    user: string;
}

export type AllOrdersResponse = {
    success: boolean;
    orders: Order[]
}
export type OrderDetailsResponse = {
    success: boolean;
    orders: Order;
}

export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
}