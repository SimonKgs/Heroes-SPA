import { useLocation, useNavigate } from "react-router-dom";

import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();

  //usamos el location que viene tambien con el router, es un objeto obtenemos de el search y pathname
  const location = useLocation();

  //  paquete para ayudar a desmenbrar la busqueda en la url, todo lo que tenga sera un string
  const { q = "" } = queryString.parse(location.search);

  const heroes = getHeroByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange, onCleanForm } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    //  navigate(``), apunta a la ruta en la que me encuentro
    navigate(`?q=${searchText.toLowerCase()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              aria-label="input"
              type="text"
              placeholder="search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            ></input>
            <button className="btn btn-primary mt-2">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
            aria-label="searchDiv"
          >
            Search a hero
          </div>
          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
            aria-label="searchError"
          >
            Not found <b>{q}</b>
          </div>
          {/* {
                Lo de arriba es lo mismo pero queda mas legible
              ( showSearch )
              ? <div className="alert alert-primary">Search a hero</div>
              : (heroes.length === 0) && <div className="alert alert-danger">Not found <b>{ q }</b></div>
            } */}
          {heroes.map((hero) => (
            <div className="mt-3" key={hero.id}>
              <HeroCard {...hero} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
