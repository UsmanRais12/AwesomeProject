import { configureStore } from "@reduxjs/toolkit";

import ProductsReducer from "./Slices/ProductsSlice";
import WishlistReducer from './Slices/WishlistSlice';
import CartReducer from './Slices/CartSlice'
import AddressReducer from "./Slices/AddressSlice";
export const store = configureStore({
    reducer:{
        product: ProductsReducer,
        wishlist: WishlistReducer,
        cart:  CartReducer,
        address: AddressReducer,
    }
})