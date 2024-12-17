
export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}


export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}


export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;

}


export type cartItem = {
    productId: string;
    photo: string;
    name: string;
    quantity: number;
    price: number;
    stock: number;
}

export type orderItem = Omit<cartItem, "stock"> & { _id: string }

export type Order = {
    orderitems: orderItem[];
    shippingInfo: ShippingInfo
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    user: {
        name: string,
        _id: string;
    };
    _id: string;

}