import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../slice/MenuSlice';
import cartReducer from "../slice/CartSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
});

export default store;