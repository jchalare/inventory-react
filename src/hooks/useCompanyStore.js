import { useDispatch, useSelector } from 'react-redux';
import { inventoryApi } from '../api';
import { selectAllCompanies, checkingCompany, setErrorMessage, clearErrorMessage, selectOneCompany, updateCompany, deleteCompany, createCompany } from '../store/company'

 
export const useCompanyStore = () => {

    const { loading, companies, errorMessage, status } = useSelector(state => state.company);
    const dispatch = useDispatch();
 

    const postOneCompany = async ({ name, itin, address, phone_number }) => {
        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.post(
                '/companies',
                { name, itin, address, phone_number },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );            

            dispatch(createCompany([data]));

        } catch (error) {
            
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const pathOneCompany = async ({ companyId,name,itin,address,phone_number }) => {

        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
            const {data} = await inventoryApi.patch(
                `/companies/${companyId}`,
                { name, itin, address, phone_number },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );            
            dispatch(updateCompany([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.detail || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const getAllCompanies = async () => {

        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                                        '/companies',
                                        {
                                            headers: {
                                                      'Authorization': `Bearer ${token}`
                                                     }
                                        }
                                    );
            dispatch(selectAllCompanies(data));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
           setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const getOneCompany = async (companyId) => {

        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                `/companies/${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            dispatch(selectOneCompany([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const deleteOneCompany = async (companyId) => {
        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
          const {data} =  await inventoryApi.delete(
                `/companies/${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            await deleteCompany([data]);
            await getAllCompanies();

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    return {
        //* Properties
        errorMessage,
        loading,
        companies,
        status,

        //* Methods        
        getAllCompanies,
        deleteOneCompany,
        getOneCompany,
        pathOneCompany,
        postOneCompany
    }

}