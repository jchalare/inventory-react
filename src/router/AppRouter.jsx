
import { Route, Routes,Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { InventoryRoutes } from '../inventory/routes/InventoryRoutes';
import { useAuthStore } from '../hooks';


 

export const AppRouter = () => {

    const { status, startLogin } = useAuthStore();

    if ( status === 'checking' ) {
        return (
            <h3>Loading...</h3>
        )
    }

  return (
    <Routes>

 {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <AuthRoutes /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } /> 
                            
                        </>
                    )
                    : (
                        <>
                          <Route path="/*" element={ <InventoryRoutes /> } />
                        </>
                    )
            }

    </Routes>
  )
}