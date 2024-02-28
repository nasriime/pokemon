import { useState, useEffect } from "react";

const PokemonList = ()=>{
    const [pokemons, setPokemons] = useState([]);

    const getPokemons = () => {
        fetch(
          `https://pokeapi.co/api/v2/pokemon`,
        )
          .then(response => response.json())
          .then(data => {
            console.log('data', data)
            setPokemons(data.results)
          })
          .catch(err => {
            console.warn("error", err);
          });
      };

      useEffect(()=>{
        getPokemons()
      }, [])

    return (
        <div>
            {pokemons.map(pokemon=> 
              <div>
                {pokemon.name}
              </div>
              )}
        </div>
    )
}


export default PokemonList;
