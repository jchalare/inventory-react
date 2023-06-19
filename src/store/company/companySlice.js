import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        companies: [], 
        loading: false,
        error: null,
    },
    reducers: {
        createCompany: (state,action ) => {
            state.loading = true;
            state.error = null;
            state.companies = action.payload;
        },
        updateCompany: (state, action) => {
            state.loading = true;
            state.error = null;
            state.companies = action.payload;
        },
        selectOneCompany: (state, action) => {
            state.loading = true;
            state.error = null;
            state.companies = action.payload;
        },
        selectAllCompanies: (state, action) => {
            state.loading = true;
            state.error = null;
            state.companies = action.payload;
        },
      
        checkingCompany: (state) => {
            state.loading = false;
            state.error = null;
            state.companies = [];
        },
        setErrorMessage: (state, action) =>  {
            state.loading = false;
            state.error = action.payload;
            state.companies = [];
        },
        clearErrorMessage: (state) => {
            state.loading = false;
            state.error = null;
        },

    }
});


export const { createCompany, updateCompany, selectOneCompany, selectAllCompanies,  checkingCompany, setErrorMessage, clearErrorMessage } = companySlice.actions;