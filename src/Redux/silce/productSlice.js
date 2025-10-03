// slice/productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

// Load products from localStorage
const initialProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: initialProducts,
    dummyAllProducts: initialProducts,
    loading: false,
    error: "",
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.allProducts.push(newProduct);
      state.dummyAllProducts.push(newProduct);
      localStorage.setItem("allProducts", JSON.stringify(state.allProducts));
    },
    deleteProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(
        (item) => item.id !== action.payload
      );
      state.dummyAllProducts = state.allProducts;
      localStorage.setItem("allProducts", JSON.stringify(state.allProducts));
    },
    updateProduct: (state, action) => {
      const { id, updateData } = action.payload;
      state.allProducts = state.allProducts.map((item) =>
        item.id === id ? { ...item, ...updateData } : item
      );
      state.dummyAllProducts = state.allProducts;
      localStorage.setItem("allProducts", JSON.stringify(state.allProducts));
    },
    searchProduct: (state, action) => {
      const search = action.payload.toLowerCase();
      state.allProducts = state.dummyAllProducts.filter((item) =>
        item.title.toLowerCase().includes(search)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const apiProducts = action.payload;

        // Merge API products with localStorage products
        const storedProducts =
          JSON.parse(localStorage.getItem("allProducts")) || [];

        const merged = [...apiProducts];
        storedProducts.forEach((prod) => {
          if (!merged.some((item) => item.id === prod.id)) {
            merged.push(prod);
          }
        });

        state.allProducts = merged;
        state.dummyAllProducts = merged;
        state.loading = false;
        state.error = "";
        localStorage.setItem("allProducts", JSON.stringify(merged));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "API call failed";
      });
  },
});

export const getAllProducts = (state) => state.product.allProducts;
export const { addProduct, deleteProduct, updateProduct, searchProduct } =
  productSlice.actions;
export default productSlice.reducer;
