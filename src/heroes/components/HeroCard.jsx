import { Link } from "react-router-dom";


//  esto es un funcional component para hacer mas legible el componente, no lo exporto pues solo lo necesitare aqui
const CharacterByHero = ( {alter_ego, characters}) => {
    if (alter_ego !== characters) return (<p>{ characters }</p>) 
}

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {

  const heroImg = `/assets/heroes/${id}.jpg`;

  return (
    <div className="col">
      <div className="card animate__animated animate__fadeInRight animate__faster">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImg} className="card-img" alt={superhero} />
          </div>
          <div className="col-8">
            <div className="card-body">
              <div className="card-title">{superhero}</div>
              <div className="card-text">{alter_ego}</div>
              <CharacterByHero alter_ego={alter_ego} characters={characters} />
              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
