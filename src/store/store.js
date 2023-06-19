import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { companySlice } from './company';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        company: companySlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});