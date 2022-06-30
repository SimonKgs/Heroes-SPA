import { types } from "../../../src/auth/types/types"

describe('Pruebas types', () => { 
        test('Debe mantener los tipos correctos', () => { 

        const acceptedTypes = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        }
        
        expect( types ).toStrictEqual( acceptedTypes );
     })
 })