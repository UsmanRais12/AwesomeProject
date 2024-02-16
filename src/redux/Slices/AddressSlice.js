import { createSlice } from "@reduxjs/toolkit";

export const AddressSlice = createSlice({
    name:'Address',
    initialState:{
        data:[],
    },
    reducers:{
        addAddress(state,action){
            state.data.push(action.payload)
        },
        deleteAddress(state,action){
            let newArr = state.data.filter(item => {return item.id != action.payload})
            state.data = newArr
        },
        updateAddress(state, action){
            let temp = state.data
            temp.map(item=>{
                if(item.id === action.payload.id){
                    item.state = action.payload.state;
                    item.city = action.payload.city;
                    item.address = action.payload.address;
                }
            })
            state.data = temp
        }
    }
})
export const {addAddress, deleteAddress , updateAddress } = AddressSlice.actions;
export default AddressSlice.reducer;