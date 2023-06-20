import { useDispatch, useSelector } from 'react-redux';
import { inventoryApi } from '../api';
import { createInventory, updateInventory, selectOneInventory, selectAllCompanies, checkingInventory, setErrorMessage, clearErrorMessage, deleteInventory } from '../store/inventory'


export const useInventoryStore = () => {

    const { loading, inventories, errorMessage, status } = useSelector(state => state.inventory);
    const dispatch = useDispatch();


    const postOneInventory = async ({company, product, amount}) => {
        dispatch(checkingInventory());
        amount = parseInt(amount);
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.post(
                '/inventories',
                { company, product, amount },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            dispatch(createInventory(data));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const pathOneInventory = async ({ inventoryId, name, itin, address, phone_number }) => {

        dispatch(checkingInventory());

        console.log({ inventoryId, name, itin, address, phone_number })

        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.patch(
                `/inventories/${inventoryId}`,
                { name, itin, address, phone_number },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            dispatch(updateInventory([data]));

        } catch (error) {
            console.log({ error })
            dispatch(setErrorMessage(error.response.data?.detail || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const getAllCompanies = async () => {

        dispatch(checkingInventory());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                '/inventories',
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


    const getOneInventory = async (inventoryId) => {

        dispatch(checkingInventory());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                `/inventories/${inventoryId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            dispatch(selectOneInventory([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const deleteOneInventory = async (inventoryId) => {
        dispatch(checkingInventory());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.delete(
                `/inventories/${inventoryId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            await deleteInventory([data]);
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
        inventories,
        status,

        //* Methods        
        getAllCompanies,
        deleteOneInventory,
        getOneInventory,
        pathOneInventory,
        postOneInventory
    }

}