import {Routes,Route, Navigate} from 'react-router-dom';
import {InventoryPages} from '../pages/InventoryPages';
import { CreateCompanyPage, ListCompanyPage, UpdateCompanyPage } from '../../ui/components/company/pages';




export const InventoryRoutes = () =>{
   return (
   
   <Routes>

    <Route path='/' element={<InventoryPages />}/>
    <Route path='/company' element={<ListCompanyPage />}/>
     <Route path='/company/create' element={<CreateCompanyPage />}/>
     <Route path='/company/review/:companyId' element={<UpdateCompanyPage/>}/>
    <Route path='/*' element={<Navigate to="/" />}/>

    
   </Routes>
   
   ) 
}