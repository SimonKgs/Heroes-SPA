import { heroes } from '../data/heroes'

export const getHeroByName = ( name = '' ) => {

    if ( name.length < 1 ) return [];

    name = name.toLocaleLowerCase().trim();

    return heroes.filter( ( hero ) => hero.superhero.toLocaleLowerCase().includes(name));

}