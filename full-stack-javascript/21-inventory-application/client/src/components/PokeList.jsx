import { useState, useContext } from "react";
import { UserContext } from "../App";
import PokeCard from "./PokeCard";

function PokeList() {
  const [list, setList] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);

  async function fetchList(currData) {
    try {
      const nextId = currData.length
        ? currData[currData.length - 1]?.dexId
        : currData.length;

      const response = await fetch(
        `http://localhost:3000/pokemon?cursor=${nextId}`,
      );

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
      // }
    } catch (error) {
      console.log(error);
      setState("error");
      // setError(error);
    }
  }

  if (!list) {
    fetchList([]);
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4 pb-12 sm:p-6 lg:p-8 dark:bg-gray-800">
      {state === "error" && <p className="h-screen">Error</p>}
      {state === "loading" && !list && <p className="h-screen">Loading...</p>}
      {list && (
        <>
          <div className="grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {list.data.map((item) => {
              return (
                <PokeCard pokemon={item} isFav={true} key={item._id}></PokeCard>
              );
            })}
          </div>
          {list.data.length < 151 && (
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
