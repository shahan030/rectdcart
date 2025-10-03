import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const result = await axios.get("https://fakestoreapi.com/products");
    return result.data;
  }
);

// Load products from localStorage if available
const initialProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: initialProducts,
      dummyAllProducts:initialProducts,
    loading: false,
    error: ""
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() }; 
      state.allProducts.push(newProduct);
      localStorage.setItem("allProducts", JSON.stringify(state.allProducts));
    },
    deleteProduct:(state,action)=>{
      state.allProducts = state.allProducts.filter((item)=>item.id !== action.payload)
      localStorage.setItem("allProducts",JSON.stringify(state.allProducts))
    },
    updateProduct:(state,action)=>{
      const {id , updateData} = action.payload
      state.allProducts = state.allProducts.map((item)=>
        item.id === id ? {...item,...updateData} :item
      )
      localStorage.setItem("allProducts",JSON.stringify(state.allProducts))
    },
    searchProduct  :(state,action)=>{
        const searchArea = action.payload.toLowerCase();
        state.allProducts = state.dummyAllProducts.filter(
  (item) => item.title.toLowerCase().includes(searchArea)
);
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
   
        const storedProducts =
          JSON.parse(localStorage.getItem("allProducts")) || [];

        const apiProducts = action.payload;
        const merged = [...apiProducts];
        storedProducts.forEach((prod) => {
          if (!merged.some((item) => item.id === prod.id)) {
            merged.push(prod);
          }
        });

        state.allProducts = merged;
        state.loading = false;
        state.error = "";
        localStorage.setItem("allProducts", JSON.stringify(state.allProducts));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "API call failed";
      });
  }
}});

// Selector to get all products
export const getAllProducts = (state) => state.product.allProducts;

export const { addProduct , deleteProduct,updateProduct,searchProduct } = productSlice.actions;
export default productSlice.reducer;
