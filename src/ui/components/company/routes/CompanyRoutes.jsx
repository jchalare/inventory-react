import {Routes,Route, Navigate, useParams} from 'react-router-dom';
import { CreateCompanyPage,ListCompanyPage, UpdateCompanyPage } from '../pages';


export const CompanyRoutes = () =>{
   return (
   
   <Routes>

    <Route path='/company' element={<ListCompanyPage />}/>
    <Route path='/company/create' element={<CreateCompanyPage />}/>
    <Route path='/company/view/:companyId' element={<UpdateCompanyPage />}/>
        
   </Routes>
   
   ) 
}