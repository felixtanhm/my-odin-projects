import { useState } from "react";

function PokeList() {
  const [list, setList] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState(null);
  const endpoint = list ? list.next : `https://pokeapi.co/api/v2/pokemon/`;
  console.log(list);

  async function fetchList() {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.results) {
        const { count, next, previous } = { ...result };
        const nextList = { count, next, previous, data: [] };
        await Promise.all(
          result.results.map(async (item) => {
            try {
              const singleResponse = await fetch(item.url);
              const singleResult = await singleResponse.json();
              item = { ...item, ...singleResult };
              nextList.data.push(item);
            } catch (error) {
              console.log({ ...item, error });
            }
          })
        );
        setList(nextList);
        setState("success");
      }
    } catch (error) {
      console.log(error);
      setState("error");
      // setError(error);
    }
  }

  if (state === "error") {
    return <p>error</p>;
  }

  if (!list) {
    console.log("api called");
    fetchList();
  }

  if (state === "loading") {
    return <p>loading...</p>;
  }

  return (
    <div>
      <p>success</p>
      {list.data.map((item) => {
        return <p key={item.id}>{item.name + " " + item.types[0].type.name}</p>;
      })}
    </div>
  );
}

export default PokeList;
