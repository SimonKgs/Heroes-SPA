import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { HeroesRouter } from "../heroes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>


        <Route path="login" element = {
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path="/*" element={
          <PrivateRoute>
            <HeroesRouter />
          </PrivateRoute>
        } />

        {/* 
            Rutas privadas las envolvemos en otro router, en el compruebo si esta autenticado el user
            si lo esta le devuelvo el children y si no lo redirecciono al login
        */}
        {/* <Route path="login" element={<LoginPage />} /> */}
        {/* <Route path="/*" element={<HeroesRouter />} /> */}
      </Routes>
    </>
  );
};
