import { useState, useEffect } from "react";
import SinglePokemon from './SinglePokemon';
import Pagination from './Pagination';

const PokemonList = ()=>{
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
   

    const getPokemons = (currentPage, offset=0, limit=20) => {
        fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
          )
          .then(response => response.json())
          .then(data => {
            const indexOfLastRecord = currentPage * pokemonsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
            const currentRecords = data.results.slice(indexOfFirstRecord, 
              indexOfLastRecord);

            setFilteredPokemons(currentRecords);
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
          setPokemons(storedPokemons);
          setFilteredPokemons(storedPokemons);
          return;
        }

        getPokemons(currentPage);
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

      const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        getPokemons(pageNumber, (pageNumber-1)*pokemonsPerPage);
      };

    return (
        <div>
          <input type="text" onChange={onSearch} />
            {filteredPokemons.map(pokemon=> 
              <div key={pokemon.name}>
                <SinglePokemon name={pokemon.name} /> 
              </div>
              )}

            <Pagination
              length={pokemons.length}
              pokemonsPerPage={pokemonsPerPage}
              currentPage={currentPage}
              handlePagination={handlePagination}
            />
        </div>
    )
}


export default PokemonList;
