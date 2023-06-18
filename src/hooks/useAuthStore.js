import { useDispatch, useSelector } from 'react-redux';
import { inventoryApi } from '../api';
import { checkingCredentials, clearErrorMessage, login, logout } from '../store/auth';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(checkingCredentials());
        try {
            const { data } = await inventoryApi.post('/auth/login', { email, password });
           
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({...data}));

        } catch (error) {
            dispatch(logout('Wrong data'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, fullName }) => {
        dispatch(checkingCredentials());
        try {
            const { data } = await inventoryApi.post('/auth/register', { email, password, fullName });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({ ...data }));

        } catch (error) {
        
            dispatch(logout(error.response.data?.message || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    /*const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout());
    
        try {
            const { data } = await inventoryApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }*/

    const startLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }



    return {
        //* Properties
        errorMessage,
        status,
        user,

        //* Methods
        startLogin,
        startLogout,
        startRegister,
    }

}