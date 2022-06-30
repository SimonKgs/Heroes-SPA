import React, { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers";

export const HeroPage = () => {
  const { id, ...rest } = useParams();
  const navigate = useNavigate();

  //  useMemo para mejorar el rendimiento en caso de que se fuese a renderizar de nuevo el componente por algun cambio
  //  en este caso no lo hara, pero asi me acostumbro a tener memorizadas las funciones internas de los componentes
  const hero = useMemo(() => getHeroById(id), [id]);

  //  A diferencia del Navigate que es un componente, el useNavigate es un hook, como una funcion y permite pasarle el -1
  //  !leer sobre ello en la doc de react-router 6
  const onNavigateBack = () => {
    hero.publisher === "DC Comics" ? navigate("/dc") : navigate("/marvel");
  };

  if (!hero) {
    return <Navigate to="/marvel" />;
    // return <>404 - not found</>
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={` /assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__flash animate__slower"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First appearence:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          back
        </button>
      </div>
    </div>
  );
};
