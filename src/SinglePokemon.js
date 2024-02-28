const SinglePokemon = ({name, toggleChecked})=>{
    const checked = JSON.parse(localStorage.getItem("checkedPokemons"));

    return (
        <li className="pokemon-wrapper">
            <input type="checkbox" defaultChecked={checked?.includes(name)} onClick={()=>toggleChecked(name)} /> 
            < span>{name}</span>
        </li>
    )

}

export default SinglePokemon;
