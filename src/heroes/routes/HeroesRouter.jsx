import { Routes, Route, Navigate } from "react-router-dom";

import { DCPage, MarvelPage, HeroPage, SearchPage} from "../";
import { Navbar } from "../../ui";

export const HeroesRouter = () => {
  return (
    <>
        <Navbar />
        <div className="container mt-2">
        <Routes>
            <Route path="marvel" element={ <MarvelPage /> } />
            <Route path="dc" element={ <DCPage /> } />
            <Route path="search" element={ <SearchPage /> } />
            {/* 
                :id, sera el comodin a las rutas de cada heroe, podemos llamarlo de cualquier forma
                lo recojo en HeroPage, con useParams que viene de router-dom 
            */}
            <Route path="hero/:id" element={ <HeroPage /> } />

            <Route path="/*" element={ <Navigate to='/marvel' /> } />
        </Routes>
        </div>
    </>
    )
}
