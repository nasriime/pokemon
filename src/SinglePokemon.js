const SinglePokemon = ({name, toggleChecked})=>{
    const checked = JSON.parse(localStorage.getItem("checkedPokemons"));

    return (
        <div>
            <input type="checkbox" defaultChecked={checked?.includes(name)} onClick={()=>toggleChecked(name)} /> 
            < span>{name}</span>
        </div>
    )

}

export default SinglePokemon;
