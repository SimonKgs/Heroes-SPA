import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../src/auth/context/AuthContext'
import { HeroesRouter } from '../../../src/heroes'


describe('Pruebas en <HeroesRouter />', () => { 

    const authContext = {
        logged: true,
        user: {
            id: '1',
            name: 'simon'
        }
    }

    test('Debe de mostrar la pagina de marvel', () => { 

        render(

            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={authContext}>
                    <HeroesRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        expect( screen.getAllByText('MARVEL')).toBeTruthy();
        expect( screen.getAllByText('MARVEL').length).toBeGreaterThanOrEqual(1);

     })
    test('Debe de mostrar la pagina de DC', () => { 

        render(

            <MemoryRouter initialEntries={['/dc']}>
                <AuthContext.Provider value={authContext}>
                    <HeroesRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        // Se diferencia de Marvel que aqui son ambos en mayusculas tanto el nombre en el Navbar como en el h1
        expect( screen.getAllByText('DC')).toBeTruthy();
        expect( screen.getAllByText('DC').length).toBeGreaterThanOrEqual(1);

     })
    test('Debe de mostrar la pagina de search', () => { 

        render(

            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={authContext}>
                    <HeroesRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug()
        expect( screen.getAllByText('Search')).toBeTruthy();
        expect( screen.getAllByText('Search').length).toBeGreaterThanOrEqual(2);

     })

 })