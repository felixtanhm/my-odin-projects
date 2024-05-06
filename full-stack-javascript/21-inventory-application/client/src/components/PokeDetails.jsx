import { useParams } from "react-router-dom";

function PokeDetails() {
  const params = useParams();
  const endpoint = "http://localhost:3000/pokemon/" + params.pokemonId;
  async function fetchPokemon() {
    try {
      const response = await fetch(endpoint);
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  fetchPokemon();

  return (
    <div>
      <div>Main Details</div>
      <div>Pokemon: {params.pokemonId}</div>
    </div>
  );
}

export default PokeDetails;
