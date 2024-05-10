import capitalise from "../utils/capitalise";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import PokeType from "./PokeType";
import { useNavigate } from "react-router-dom";

function PokeCard({ pokemon, isFav }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-fit cursor-pointer flex-col items-center rounded-md bg-gray-200 p-4 dark:bg-gray-500/20"
      onClick={() => {
        navigate(`/pokemon/${pokemon.dexId}`);
      }}
    >
      <div className="absolute self-end">
        {isFav && (
          <HeartIconSolid
            className="relative h-6 w-6 text-rose-500 dark:text-rose-800	"
            aria-hidden="true"
          />
        )}
        {!isFav && (
          <HeartIconOutline
            className="relative h-6 w-6 text-gray-500"
            aria-hidden="true"
          />
        )}
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
