import capitalise from "../utils/capitalise";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import PokeType from "./PokeType";
import { useNavigate } from "react-router-dom";

function PokeCard({ pokemon }) {
  const navigate = useNavigate();
  function toggleFavorite(e, pokemonId) {
    e.stopPropagation();
    console.log(pokemonId);
  }

  function displayPokemon(e, pokemonId) {
    console.log(e);
    console.log(pokemonId);
    navigate(`/pokemon/${pokemonId}`);
  }

  return (
    <div
      className="flex cursor-pointer flex-col items-center rounded-md bg-gray-200 p-4 dark:bg-gray-500/20"
      onClick={(e) => {
        displayPokemon(e, pokemon.id);
      }}
    >
      <div className="absolute self-end">
        <button
          type="button"
          className="relative rounded-full p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800"
          onClick={(e) => {
            toggleFavorite(e, pokemon.id);
          }}
        >
          <span className="sr-only">Favorite Pokemon</span>
          <HeartIconOutline className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <img className="mt-6 max-w-24" src={pokemon.sprites.front_default}></img>
      <div className="flex flex-col items-center gap-2 p-2">
        <p className="text-xl font-bold text-gray-900 dark:text-gray-300">
          {capitalise(pokemon.name)}
        </p>
        <div className="flex gap-2">
          {pokemon.types.map((typeObj) => {
            return (
              <PokeType
                key={typeObj.type.name}
                type={capitalise(typeObj.type.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
