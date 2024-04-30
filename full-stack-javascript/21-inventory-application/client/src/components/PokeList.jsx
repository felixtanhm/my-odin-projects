import { useState, useEffect } from "react";
import useSWR from "swr";

async function fetchList(endpoint) {
  const response = await fetch(endpoint);
  const result = await response.json();

  return result;
}

function PokeList() {
  const [list, setList] = useState({});
  const endpoint = list.next ? list.next : `https://pokeapi.co/api/v2/pokemon/`;

  const { data, error, isLoading } = useSWR(endpoint, fetchList);
  console.log({ data, error, isLoading });
  return (
    <div>
      <p>loading...</p>
      <button onClick={fetchList}></button>
    </div>
  );
}

export default PokeList;
