import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        inventories: [], 
        loading: false,
        errorMessage: null,
        status: null
    },
    reducers: {
        createInventory: (state,action ) => {
            state.loading = true;
            state.errorMessage = null;
            state.inventories = action.payload;
            state.status = 'created';
        },
        updateInventory: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.inventories = action.payload;
            state.status = 'updated';
        },
        deleteInventory: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.inventories = action.payload;
            state.status = 'deleted';
        },
        selectOneInventory: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.inventories = action.payload;
            state.status = null;
        },
        selectAllCompanies: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.inventories = action.payload;
            state.status = null;
        },      
        checkingInventory: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.inventories = [];
            state.status = null;
        },
        setErrorMessage: (state, action) =>  {
            state.loading = false;
            state.errorMessage = action.payload;
            state.inventories = [];
            state.status = null;
        },
        clearErrorMessage: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.status = null;
        },

    }
});


export const { createInventory, updateInventory, selectOneInventory, selectAllCompanies, checkingInventory, setErrorMessage, clearErrorMessage, deleteInventory } = inventorySlice.actions;