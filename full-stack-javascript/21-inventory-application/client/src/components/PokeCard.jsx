import capitalise from "../utils/capitalise";

function PokeCard({ pokemon }) {
  // console.log(pokemon);

  return (
    <div className="p-4 flex flex-col items-center border-solid border-2 border-gray-900 rounded-md">
      <img className="max-w-24	" src={pokemon.sprites.front_default}></img>
      <p>{capitalise(pokemon.name)}</p>
      <div>
        {pokemon.types.map((typeObj) => {
          return <span key={typeObj.type.name}>{typeObj.type.name}</span>;
        })}
      </div>
    </div>
  );
}

export default PokeCard;
