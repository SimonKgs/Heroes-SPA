import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext'

export const PrivateRoute = ({ children }) => {
    
    //  obtenemos del context si el usuario esta autenticado
    const { logged } = useContext(AuthContext);

    //  con esto almacenamos la ultima ruta
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastpath', lastPath)
    // console.log( 'RE-render ', lastPath );


    //  si lo esta devuelvo el children, si no lo redirecciono al login
    return ( logged ) 
        ? children
        : <Navigate to="/login" />
}
