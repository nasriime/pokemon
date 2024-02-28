import { useState, useEffect } from "react";
import SinglePokemon from './SinglePokemon';

const PokemonList = ()=>{
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const getPokemons = (limit=20, offset=20) => {
        fetch(
          `https://pokeapi.co/api/v2/pokemon`,
        )
          .then(response => response.json())
          .then(data => {
            console.log('data', data);
            setPokemons(data.results);
            setFilteredPokemons(data.results);
            localStorage.setItem("pokemons", JSON.stringify(data.results));
          })
          .catch(err => {
            console.log("error", err);
          });
      };

      useEffect(()=>{
        var storedPokemons = JSON.parse(localStorage.getItem("pokemons"));

        if(storedPokemons.length){
          setPokemons(storedPokemons);
          setFilteredPokemons(storedPokemons);
          return;
        }

        getPokemons();
      }, [])

      const onSearch = (e)=>{
        const searchTerm = e.target.value;
        if(!searchTerm) {
          setFilteredPokemons(pokemons)
          return;
        }
        
        const filtered = pokemons.filter(pokemon => pokemon.name.includes(searchTerm));
        setFilteredPokemons(filtered);
      }

    return (
        <div>
          <input type="text" onChange={onSearch} />
            {filteredPokemons.map(pokemon=> 
              <div key={pokemon.name}>
                <SinglePokemon name={pokemon.name} /> 
              </div>
              )}
        </div>
    )
}


export default PokemonList;
