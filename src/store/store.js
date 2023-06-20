import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { companySlice } from './company';
import { productSlice } from './product';




export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        company: companySlice.reducer,
        product: productSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});