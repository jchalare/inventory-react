import { useDispatch, useSelector } from 'react-redux';
import { inventoryApi } from '../api';
import { selectAllCompanies, checkingCompany, setErrorMessage, clearErrorMessage, selectOneCompany } from '../store/company'


export const useCompanyStore = () => {

    const { loading, companies, error } = useSelector(state => state.company);
    const dispatch = useDispatch();
 

    const pathOneCompany = async ({ companyId,name,itin,address,phone_number }) => {

        dispatch(checkingCompany());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.path(
                `/companies/${companyId}`,
                { name, itin, address, phone_number },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            dispatch(updateCompany(data));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
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
            await inventoryApi.delete(
                `/companies/${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

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
        error,
        loading,
        companies,

        //* Methods        
        getAllCompanies,
        deleteOneCompany,
        getOneCompany,
        pathOneCompany
    }

}