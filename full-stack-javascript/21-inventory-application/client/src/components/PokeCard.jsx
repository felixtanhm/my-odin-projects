import capitalise from "../utils/capitalise";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import PokeType from "./PokeType";
import { useNavigate } from "react-router-dom";

function PokeCard({ pokemon, isFav }) {
  const navigate = useNavigate();
  function toggleFavorite(e, dexId) {
    e.stopPropagation();
    console.log(dexId);
  }

  return (
    <div
      className="flex cursor-pointer flex-col items-center rounded-md bg-gray-200 p-4 dark:bg-gray-500/20"
      onClick={() => {
        navigate(`/pokemon/${pokemon.dexId}`);
      }}
    >
      <div className="absolute self-end">
        <button
          type="button"
          className="relative rounded-full p-1 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800"
          onClick={(e) => {
            toggleFavorite(e, pokemon.dexId);
          }}
        >
          <span className="sr-only">Favorite Pokemon</span>
          {isFav && (
            <HeartIconSolid
              className="h-6 w-6 text-rose-500 dark:text-rose-800	"
              aria-hidden="true"
            />
          )}
          {!isFav && (
            <HeartIconOutline className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
      <img className="mt-6 max-w-24" src={pokemon.avatar}></img>
      <div className="flex flex-col items-center gap-2 p-2">
        <p className="text-xl font-bold text-gray-900 dark:text-gray-300">
          {capitalise(pokemon.name)}
        </p>
        <div className="flex gap-2">
          {pokemon.types.map((type) => {
            return <PokeType key={type} type={capitalise(type)} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
