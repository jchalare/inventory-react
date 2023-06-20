import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { companySlice } from './company';
import { productSlice } from './product';
import { inventorySlice } from './inventory';




export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        company: companySlice.reducer,
        product: productSlice.reducer,
        inventory: inventorySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});