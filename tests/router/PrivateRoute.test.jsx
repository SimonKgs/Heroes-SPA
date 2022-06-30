import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { PrivateRoute } from '../../src/router/PrivateRoute'

describe('Pruebas en <PrivateRoute />', () => { 
    test('Debe de enviar al usuario logueado a la ruta en la que estaba', () => { 
        //  para llamar al localStorage en los tests
        Storage.prototype.setItem = jest.fn()

        const contextValue = { logged: true, user: { id: 1, name: 'simon' } }

        //  nos vale que muestre cualquier children si esta en false, no hace falta un children real, uso el h1 como children
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug()
        expect(screen.getByText('Ruta privada')).toBeTruthy()
        //  vemos en el fallo que se llama con 2 argumentos, el nombre que tendra en el storage y la ruta que le digamos en el initialEntries
        //  esta sera la ruta en la que se renderice el componente gracias al MemoryRouter y lastpath el nombre que le dimos en PrivateRoute para guardarla
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastpath", "/dc");
     })
 })