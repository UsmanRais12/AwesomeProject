const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    AddtoCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (item.id == action.payload.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }

      state.data = tempData;
    },
    ReduceFromCart(state, action) {
      let tempData = state.data;

      tempData.map(item => {
        if (item.id == action.payload.id) {
          item.qty = item.qty - 1;
        }
      });

      state.data = tempData;
    },
    RemoveFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);

      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});
export const {AddtoCart, ReduceFromCart , RemoveFromCart} = CartSlice.actions;
export default CartSlice.reducer;