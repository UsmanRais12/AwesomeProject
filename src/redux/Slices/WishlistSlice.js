import { createSlice } from "@reduxjs/toolkit";
const WishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        data: []
    },
    reducers:{
        addItemtoWishList(state,action){
            let tempData = state.data
            tempData.push(action.payload)
            state.data = tempData
        }
    }
})
export const {addItemtoWishList} = WishlistSlice.actions;
export default WishlistSlice.reducer