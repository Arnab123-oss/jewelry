
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
    pinCode: string;

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
    orderItems: orderItem[];
    shippingInfo: ShippingInfo
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string,
        _id: string;
    };
    _id: string;

}

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
}

type LatestTransaction = {
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: string;
}

export type Stats = {
    categoryCount: Record<string, number>[],
    changePercent: CountAndChange;
    count: CountAndChange;
    userRatio: {
        male: number;
        female: number;
    },
    latestTransction: LatestTransaction[],
    chart: {
        order: number[],
        revenue: number[],
    }
}


export type Pie = {
    orderFulfilment: {
        processing: number;
        shipped: number;
        delivered: number;
    };
    productCategories: Record<string, number>[];
    stockAvailablity: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    };
    adminCustomer: {
        admin: number;
        customer: number;
    };
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    };
}

export type Bar = {
    products: number[];
    users: number[];
    orders: number[];
}

export type Line = {
    products: number[];
    users: number[];
    discount: number[];
    revenue: number[];
}


