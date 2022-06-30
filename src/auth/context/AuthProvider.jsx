import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

import { types } from "../types/types"

//  ahora inicio en el init lo dejo de ejemplo, lo modifico por un {}
// const initialState = {
//     logged: false,
// }

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {

    const [ authState, dispatchAuth ] = useReducer(authReducer, {}, init);
    
    const onLogin = ( name = '' ) => {
        
        const user = {
            id: '1',
            name
        }

        const action = {
            type: types.login,
            payload: user,
        }

        localStorage.setItem('user', JSON.stringify(user));
        
        dispatchAuth(action)
    }

    const onLogout = () => {
        //  le pasamos un objeto vacio en lugar de una cadena vacia para evitar que el parse del init rompa la aplicacion si se recarga la pagina
        //  localStorage.setItem('user', JSON.stringify({ user: ''}));
        //  dejo de ejemplo pero mas facil y sin errores removemos el item, al encontrarse el logged !!user recordemos que pasa el null a true y lo devuelvo a false
        //  con ello no intenta hacer el parse del user pues lo borro
        localStorage.removeItem('user');
        dispatchAuth( { type: types.logout } );
    }

    return (
        <AuthContext.Provider value={{ ...authState, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>

    )
}
