import {Routes,Route, Navigate} from 'react-router-dom';
import {InventoryPages} from '../pages/InventoryPages';
export const InventoryRoutes = () =>{
   return (
   
   <Routes>

    <Route path='/' element={<InventoryPages />}/>

     <Route path='/*' element={<Navigate to="/" />}/>

    
   </Routes>
   
   ) 
}