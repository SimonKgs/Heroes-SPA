import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { Navbar } from '../../src/ui/components/Navbar'

//  para hacer un mock de este useNavigate a diferencia de los anteriores que le pasabamos la ruta
//  le pasamos una funcion en la que igualamos el useNavigate al un mockNavigate creado aqui mismo
//  entonces cuando se llame el useNavigate se ejecutara el mock
//  como sobreescribimos el useNavigate pero hay muchos valores en esa ruta que no queremos sobreescribir
//  debemos ademas desestructurar todo el contenido de esa ruta y se nos facilita con jest.requireActual
const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate

}))


describe('Pruebas en <Navbar />', () => {


    const authContext = {
        logged: true,
        user: {
            id: 1,
            name: 'simon'
        },
        onLogout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())

    test('Debe de aparecer el nombre del usuario validado', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={authContext}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        // screen.debug()
        expect(screen.getByText('simon').innerHTML).toBe(authContext.user.name)
        expect(screen.getByText('simon').innerHTML).toBeTruthy()

    })

    test('Debe llamar el logout y navigate cuando se hace click en logout', () => {

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={authContext}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        // screen.debug()
        const button = screen.getByRole('button');
        // console.log(button);
        fireEvent.click(button)
        
        expect( authContext.onLogout ).toBeCalledTimes(1)
        expect( authContext.onLogout ).toHaveBeenCalled()
        
        //  tras el mock del navigate probamos que se haya llamado, primero fuerzo el error para ver los argumentos
        //  los comparo contra los que tengo definidos en mi componente y los añado para asegurar de que se haya llamado con ellos
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true})
    })
})