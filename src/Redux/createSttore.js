// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './silce/productSlice';


const store = configureStore({
  reducer: {
    product: productReducer, 

  },
});

export default store;
