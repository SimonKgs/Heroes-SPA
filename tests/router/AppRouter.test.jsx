import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../src/auth/context/AuthContext'
import { AppRouter } from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter />', () => {
    test('Debe de mostrar el login si no esta autenticado', () => {
        const authContext = {
            logged: false
        }
        render(
            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={authContext}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        expect( screen.getAllByText('Login')).toBeTruthy();
        expect( screen.getAllByText('Login').length).toBe(2);
    });

    test('Debe de mostrar marvel si esta autenticado', () => {
        const authContext = {
            logged: true
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={authContext}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        expect( screen.getAllByText('Marvel')).toBeTruthy();
        expect( screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    })
})