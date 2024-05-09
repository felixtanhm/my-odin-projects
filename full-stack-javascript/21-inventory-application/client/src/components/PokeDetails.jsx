import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import PokeType from "./PokeType";
import Button from "./Button";
import capitalise from "../utils/capitalise";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

function PokeDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [currPokemon, setCurrPokemon] = useState(null);
  const [state, setState] = useState("loading");
  let isFav = null;

  function handleFavorite(favoriteList) {
    const { prevFavs, nextFavs } = toggleFavorite(favoriteList);
    const data = {
      objectId: user._id,
      favorites: nextFavs,
    };
    updateUser(data, prevFavs);
  }

  function toggleFavorite(favoritesList) {
    const prevFavs = [...favoritesList];
    let nextFavs = favoritesList ? [...favoritesList] : [];
    if (isFav) {
      const index = nextFavs.indexOf(currPokemon._id);
      if (index > -1) nextFavs.splice(index, 1);
    } else {
      nextFavs.push(currPokemon._id);
    }
    setUser({ ...user, favorites: nextFavs });
    return { prevFavs, nextFavs };
  }

  async function updateUser(data, prevFavs) {
    const response = await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setUser({ ...user, favorites: [...prevFavs] });
    }
  }

  function handleNav(dexId, isPrev) {
    const nextDexId = isPrev ? dexId - 1 : dexId + 1;
    navigate(`/pokemon/${nextDexId}`);
    fetchPokemon(nextDexId);
  }

  async function fetchPokemon(dexId) {
    try {
      const response = await fetch(`http://localhost:3000/pokemon/${dexId}`);

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

  if (!currPokemon) fetchPokemon(params.dexId);

  if (user) {
    if (user.favorites && currPokemon) {
      isFav = user.favorites.includes(currPokemon._id);
    } else isFav = false;
  }

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
            <Button
              isDisabled={currPokemon.dexId === 1}
              onClick={() => {
                handleNav(currPokemon.dexId, true);
              }}
              text={"Previous"}
            />
            <button
              type="button"
              className="flex w-36 items-center justify-center gap-1 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-500/20 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => {
                handleFavorite(user.favorites);
              }}
            >
              <span className="sr-only">Favorite Pokemon</span>
              {isFav && (
                <HeartIconSolid
                  className="h-5 text-rose-500 dark:text-rose-800	"
                  aria-hidden="true"
                />
              )}
              {!isFav && (
                <HeartIconOutline className="h-5" aria-hidden="true" />
              )}
              {isFav ? "Favorited" : "Add Favorite"}
            </button>
            <Button
              isDisabled={currPokemon.dexId === 151}
              onClick={() => {
                handleNav(currPokemon.dexId, false);
              }}
              text={"Next"}
            />
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
