import { useState, useEffect } from "react";

const PokemonList = ()=>{
    const [pokemons, setPokemons] = useState([]);

    const getPokemons = (limit=20, offset=20) => {
        fetch(
          `https://pokeapi.co/api/v2/pokemon`,
        )
          .then(response => response.json())
          .then(data => {
            console.log('data', data);
            setPokemons(data.results);
            localStorage.setItem("pokemons", JSON.stringify(data.results));
          })
          .catch(err => {
            console.log("error", err);
          });
      };

      useEffect(()=>{
        var storedPokemons = JSON.parse(localStorage.getItem("pokemons"));

        if(storedPokemons.length){
          return;
        }

        getPokemons();
      }, [])

    return (
        <div>
            {pokemons.map(pokemon=> 
              <div key={pokemon.name}>
                {pokemon.name}
              </div>
              )}
        </div>
    )
}


export default PokemonList;
