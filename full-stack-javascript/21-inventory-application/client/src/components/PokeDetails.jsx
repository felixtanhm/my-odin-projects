import { useParams } from "react-router-dom";
import { useState } from "react";
import PokeType from "./PokeType";
import capitalise from "../utils/capitalise";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

function PokeDetails() {
  const params = useParams();
  const [currPokemon, setCurrPokemon] = useState(null);
  const [state, setState] = useState("loading");

  function toggleFavorite(e, dexId) {
    e.stopPropagation();
    console.log(dexId);
  }

  async function fetchPokemon() {
    try {
      const response = await fetch(
        `http://localhost:3000/pokemon/${params.dexId}`,
      );

      if (!response.ok) {
        let errorMessage = `Failed to fetch data. Status: ${response.status}`;
        if (response.statusText) {
          errorMessage += `, Message: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setCurrPokemon(result);
      setState("success");
    } catch (error) {
      console.log(error);
      setState("error");
    }
  }

  if (!currPokemon) fetchPokemon();

  return (
    <div className="flex flex-col items-center gap-4 p-4 pb-12 sm:p-6 lg:p-8 dark:bg-gray-800">
      {state === "error" && <p className="h-screen">Error para</p>}
      {state === "loading" && !currPokemon && (
        <p className="h-screen">Loading...</p>
      )}
      {currPokemon && (
        <>
          {/* Buttons */}
          <div className="flex w-full justify-between gap-4 md:w-96">
            <button className="w-20 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-500/20 dark:text-gray-300 dark:hover:bg-gray-700">
              Previous
            </button>
            <button
              type="button"
              className="w-32 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-500/20 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={(e) => {
                toggleFavorite(e, currPokemon.dexId);
              }}
            >
              <span className="sr-only">Favorite Pokemon</span>
              <HeartIconOutline className="h-6 w-full" aria-hidden="true" />
            </button>
            <button className="w-20 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-500/20 dark:text-gray-300 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
          <img
            className="mt-6 min-w-28 max-w-24"
            src={currPokemon.avatar}
          ></img>
          {/* Name and Types */}
          <div className="flex w-full flex-col items-center gap-4 p-2 md:w-96">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
              {capitalise(currPokemon.name)}
            </h1>
            <div className="flex gap-2">
              {currPokemon.types.map((type) => {
                return <PokeType key={type} type={capitalise(type)} />;
              })}
            </div>
          </div>
          {/* Details */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4 rounded-md  bg-gray-200 p-4 md:w-96 dark:bg-gray-500/20">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-300">
                Height:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.height / 10 + " m"}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-300">
                Weight:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.weight / 10 + " kg"}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-300">
                Abilities:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.abilities
                  .map((ability) => {
                    return capitalise(ability);
                  })
                  .join(", ")}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-300">
                Gender:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.has_gender ? "♂️ / ♀️" : ""}
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2 rounded-md  bg-gray-200 p-4 md:w-96 dark:bg-gray-500/20">
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                HP:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.hp}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                Attack:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.attack}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                Defense:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.defense}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                Special Attack:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.special_attack}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                Special Defense:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.special_defense}
              </p>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300">
                Speed:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-300">
                {currPokemon.details.speed}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PokeDetails;
