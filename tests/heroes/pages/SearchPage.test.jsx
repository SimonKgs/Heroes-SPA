import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../src/auth/context/AuthContext'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'


const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))


describe('Pruebas en <SearchScreen />', () => {

    const authContext = {
        logged: true,
        user: {
            id: 1,
            name: 'simon'
        }
    }

    beforeEach( () => jest.clearAllMocks() );
    test('Debe de hacer match con el snapshot', () => {


        const { container } = render(
            <MemoryRouter>
                <AuthContext.Provider value={ authContext }>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( container ).toMatchSnapshot();

    })

    test('Debe de mostrar a batman y el input con el valor del queryString', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <AuthContext.Provider value={ authContext }>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // para los input usamos textbox
        // const input = screen.getByRole('textbox'); 
        //  utilice un aria-label en su lugar para acceder al input que quiero
        const inputValue = screen.getByLabelText('input');
        expect( inputValue.value ).toBe('batman');

        const searchDiv = screen.getByLabelText("searchDiv");
        expect( searchDiv.style.display ).toBe( "none" )
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain("/assets/heroes/dc-batman.jpg")
        
    })

    test('Debe de llamar al navigate con los valores de la busqueda', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <AuthContext.Provider value={ authContext }>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
        //  obtnemos el input y lo lanzamos con change dandole el nombre y el valor que tomara la caja
        //  no es necesario como yo lo hice pues mi texbox toma el valor de la url en las entries 
        //  pero con ello probamos tambien el propio input
        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: 'batman'}})
        
        //  tambien podria haber simulado el envio del formulario pero lo hice con el boton, el funcionamiento es el mismo
        //  const form = screen.getByRole('form') !! el form no lo coge jest, ponerle un aria label 
        //  fireEvent.submit( form );
        const searchButton = screen.getByRole('button');
        fireEvent.click(searchButton)
        expect( mockedUseNavigate ).toHaveBeenCalledWith("?q=batman")
        
        expect( screen.getByText('Batman').innerHTML ).toBe('Batman')
     });

     test('Debe de mostrar el error en caso de que no haya encontrado un heroe', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=asa']}>
                <AuthContext.Provider value={ authContext }>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const searchError = screen.getByLabelText("searchError");
        expect( searchError.style.display ).toBe( "" )


      })
})