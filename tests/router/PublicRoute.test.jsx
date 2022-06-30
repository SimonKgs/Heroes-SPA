const { render, screen } = require("@testing-library/react")
const { Route, Routes, MemoryRouter } = require("react-router-dom")
const { AuthContext } = require("../../src/auth/context/AuthContext")
const { PublicRoute } = require("../../src/router/PublicRoute")

describe('Pruebas en <PublicRoute />', () => {

    test('Debe mostrar el children si no esta autenticado', () => {

        const contextValue = { logged: false }

        //  nos vale que muestre cualquier children si esta en false, no hace falta un children real, uso el h1 como children
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug()
        expect(screen.getByText('Ruta publica')).toBeTruthy()
    })

    test('(Debe navegar hacia marvel / No debe ver el children) si esta logueado', () => {

        const contextValue = { logged: true, user: { id: 1, name: 'simon' } }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Pagina marvel</h1>} />
                        {/* <Route path='/' element={<h1>Pagina marvel</h1>} /> */}
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // screen.debug();
        expect( screen.getByText('Pagina marvel')).toBeTruthy()
    })
})