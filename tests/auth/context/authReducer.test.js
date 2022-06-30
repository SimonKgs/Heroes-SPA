import { useReducer } from "react";
import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {

    const initialState = {
        logged: false,
    }

    const user = {
        id: '1',
        name: 'simon'
    }
    
    test('Debe retornar el estado por defecto', () => { 
        const state = authReducer(initialState, {});

        // Valen las 2 pero para objetos toEqual
        expect( state ).toStrictEqual(initialState);
        expect( state ).toBe(initialState);

    })
    test('Debe llamar al login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: user,
        }
        
        const state = authReducer(initialState, action);

        expect( action.type ).toBe(types.login);
        expect( state ).toStrictEqual( { logged: true, user: { id: '1', name: 'simon' } })

    })
    test('Debe de logout borrar el name del user y logged en false', () => { 

        const action = {
            type: types.logout,
        }
        
        const initial = { logged: true, user: { id: '1', name: 'simon' } }; 
        const state = authReducer(initial, action);
        // console.log(state);
        expect( action.type ).toBe(types.logout);
        expect( state ).toStrictEqual( initialState );

    })
 })