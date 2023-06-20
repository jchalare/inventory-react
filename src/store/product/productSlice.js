import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [], 
        loading: false,
        errorMessage: null,
        status: null
    },
    reducers: {
        createProduct: (state,action ) => {
            state.loading = true;
            state.errorMessage = null;
            state.products = action.payload;
            state.status = 'created';
        },
        updateProduct: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.products = action.payload;
            state.status = 'updated';
        },
        deleteProduct: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.products = action.payload;
            state.status = 'deleted';
        },
        selectOneProduct: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.products = action.payload;
            state.status = null;
        },
        selectAllproducts: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.products = action.payload;
            state.status = null;
        },      
        checkingProduct: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.products = [];
            state.status = null;
        },
        setErrorMessage: (state, action) =>  {
            state.loading = false;
            state.errorMessage = action.payload;
            state.products = [];
            state.status = null;
        },
        clearErrorMessage: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.status = null;
        },

    }
});


export const { createProduct, updateProduct, selectOneProduct, selectAllproducts, checkingProduct, setErrorMessage, clearErrorMessage, deleteProduct } = productSlice.actions;