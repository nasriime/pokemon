import { useState, useEffect } from "react";
import SinglePokemon from './SinglePokemon';
import Pagination from './Pagination';

const PokemonList = ()=> {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const pokemonsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedPokemons, setCheckedPokemons] = useState([]);
    const storedPokemons = JSON.parse(localStorage.getItem("pokemons"));
    const storedCheckedPokemons = JSON.parse(localStorage.getItem("checkedPokemons"));

    const updatePokemons = (currentPage, data)=>{
      const indexOfLastRecord = currentPage * pokemonsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
      const currentPokemons = data.slice(indexOfFirstRecord, 
        indexOfLastRecord);

        return currentPokemons;
    }
   
    const getPokemons = (currentPage, offset=0, limit=20) => {
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        )
        .then(response => response.json())
        .then(data => {
          setFilteredPokemons(updatePokemons(currentPage, data.results));

          // Set total pokemons first time only
          if(pokemons?.length === 0){
            setPokemons(data.results);
            localStorage.setItem("pokemons", JSON.stringify(data.results));
          }
        })
        .catch(err => {
          console.log("error", err);
        });
    }

    useEffect(()=>{
      if(storedPokemons?.length){
        setPokemons(storedPokemons);
        // updatePokemons(currentPage, storedPokemons)
      
        setFilteredPokemons(updatePokemons(currentPage, storedPokemons));
      } else {
        getPokemons(currentPage);
      }

      if(storedCheckedPokemons?.length){
        setCheckedPokemons(storedCheckedPokemons);
      } 
    }, []);

    const onSearch = (e)=>{
      const searchTerm = e.target.value;
      if(!searchTerm) {
        setFilteredPokemons(updatePokemons(currentPage, pokemons))
        return;
      }
      
      const filtered = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPokemons(filtered);
    }

    const handlePagination = (pageNumber) => {
      setCurrentPage(pageNumber);
      if(storedPokemons?.length){
        setFilteredPokemons(updatePokemons(pageNumber, storedPokemons))
      }
      getPokemons(pageNumber, (pageNumber-1)*pokemonsPerPage);
    }
      
    const toggleChecked = (name)=>{
      let newCheckedPokemon;
      if(checkedPokemons[name]){
        newCheckedPokemon = checkedPokemons.filter(pokemon=> pokemon.name !== name);
        setCheckedPokemons(newCheckedPokemon);
        localStorage.setItem("checkedPokemons", JSON.stringify(newCheckedPokemon));
      }else{
        newCheckedPokemon = [...checkedPokemons, name];
        setCheckedPokemons(newCheckedPokemon);
        localStorage.setItem("checkedPokemons", JSON.stringify(newCheckedPokemon));
      }
    }


    return (
        <div>
          <input className="input-search" type="text" placeholder="Search..." onChange={onSearch} />
          <ul>
            {filteredPokemons.map(pokemon=> 
                <SinglePokemon key={pokemon.name} name={pokemon.name} toggleChecked={toggleChecked} /> 
              )}
          </ul>

          {filteredPokemons.length > 0 ? <Pagination
            length={pokemons.length}
            pokemonsPerPage={pokemonsPerPage}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />: <div>No results found</div>}
        </div>
    )
}


export default PokemonList;
