import { useDispatch, useSelector } from 'react-redux';
import { inventoryApi } from '../api';

import { createProduct, updateProduct, selectOneProduct, selectAllproducts, checkingProduct, setErrorMessage, clearErrorMessage, deleteProduct } from '../store/product'


 
export const useProductStore = () => {

    const { loading, products, errorMessage, status } = useSelector(state => state.product);
    const dispatch = useDispatch();
 

    const postOneProduct = async ({ name, amount, price, description }) => {

        dispatch(checkingProduct());       
        amount = parseInt(amount);
        price = parseFloat(price);
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.post(
                '/products',
                { name, amount, price, description},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );            

            dispatch(createProduct([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.detail || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const pathOneProduct = async ({ productId, name, amount, price, description }) => {

        dispatch(checkingProduct());
        amount = parseInt(amount);
        price = parseFloat(price);
        try {
            const token = localStorage.getItem('token');
            const {data} = await inventoryApi.patch(
                `/products/${productId}`,
                {  name, amount, price, description },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );            
            dispatch(updateProduct([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.detail || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const getAllProducts = async () => {

        dispatch(checkingProduct());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                                        '/products',
                                        {
                                            headers: {
                                                      'Authorization': `Bearer ${token}`
                                                     }
                                        }
                                    );
            dispatch(selectAllproducts(data));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
           setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const getOneProduct = async (productId) => {

        dispatch(checkingProduct());
        try {
            const token = localStorage.getItem('token');
            const { data } = await inventoryApi.get(
                `/products/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            dispatch(selectOneProduct([data]));

        } catch (error) {
            dispatch(setErrorMessage(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const deleteOneProduct = async (productId) => {
        dispatch(checkingProduct());
        try {
            const token = localStorage.getItem('token');
          const {data} =  await inventoryApi.delete(
                `/products/${productId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            await deleteProduct([data]);
            await getAllProducts();

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
        products,
        status,

        //* Methods        
        getAllProducts,
        deleteOneProduct,
        getOneProduct,
        pathOneProduct,
        postOneProduct
    }

}