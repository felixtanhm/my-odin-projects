import { useState, useContext } from "react";
import { UserContext } from "../App";
import PokeCard from "./PokeCard";

function PokeList({ path }) {
  const [list, setList] = useState(null);
  const [state, setState] = useState("loading");
  const [page, setPage] = useState(path);
  const { user, setUser } = useContext(UserContext);

  async function fetchList(currData) {
    try {
      let url;
      if (path === "home") {
        const nextId = currData.length
          ? currData[currData.length - 1]?.dexId
          : currData.length;
        url = `http://localhost:3000/pokemon?cursor=${nextId}`;
      }
      if (path === "favorites") {
        url = `http://localhost:3000/users/favorites`;
      }
      const response = await fetch(url);

      if (!response.ok) {
        let errorMessage = `Failed to fetch data. Status: ${response.status}`;
        if (response.statusText) {
          errorMessage += `, Message: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      const nextList = {
        totalCount: result.totalCount,
        data: [...currData, ...result.data],
      };

      setList(nextList);
      setState("success");
      setPage(path);
    } catch (error) {
      console.log(error);
      setState("error");
      // setError(error);
    }
  }

  if (!list || path !== page) {
    fetchList([]);
  }
  console.log(user);
  return (
    <div className="flex flex-col items-center gap-8 p-4 pb-12 sm:p-6 lg:p-8 dark:bg-gray-800">
      {state === "error" && <p className="h-screen">Error</p>}
      {state === "loading" && !list && (
        <p className="h-screen text-3xl font-bold text-gray-500">Loading...</p>
      )}
      {list && (
        <>
          <div className="grid min-h-screen w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {list.data.map((item) => {
              return (
                <PokeCard
                  pokemon={item}
                  isFav={
                    path === "favorites"
                      ? true
                      : user.favorites.includes(item._id)
                  }
                  key={item._id}
                ></PokeCard>
              );
            })}
          </div>
          {list.data.length < 151 && path !== "favorites" && (
            <button
              className="w-fit min-w-32 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-100"
              disabled={state === "loading"}
              onClick={() => {
                setState("loading");
                fetchList(list.data);
              }}
            >
              {state === "loading" ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PokeList;
