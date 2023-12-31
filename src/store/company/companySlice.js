import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        companies: [], 
        loading: false,
        errorMessage: null,
        status: null
    },
    reducers: {
        createCompany: (state,action ) => {
            state.loading = true;
            state.errorMessage = null;
            state.companies = action.payload;
            state.status = 'created';
        },
        updateCompany: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.companies = action.payload;
            state.status = 'updated';
        },
        deleteCompany: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.companies = action.payload;
            state.status = 'deleted';
        },
        selectOneCompany: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.companies = action.payload;
            state.status = null;
        },
        selectAllCompanies: (state, action) => {
            state.loading = true;
            state.errorMessage = null;
            state.companies = action.payload;
            state.status = null;
        },      
        checkingCompany: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.companies = [];
            state.status = null;
        },
        setErrorMessage: (state, action) =>  {
            state.loading = false;
            state.errorMessage = action.payload;
            state.companies = [];
            state.status = null;
        },
        clearErrorMessage: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.status = null;
        },

    }
});


export const { createCompany, updateCompany, selectOneCompany, selectAllCompanies, checkingCompany, setErrorMessage, clearErrorMessage, deleteCompany } = companySlice.actions;