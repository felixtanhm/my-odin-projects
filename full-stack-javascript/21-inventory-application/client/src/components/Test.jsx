import { useParams } from "react-router-dom";
import { Outlet, useMatch } from "react-router-dom";

function Test({ text }) {
  const params = useParams();
  return (
    <div>
      <p>{text + " " + params.pokemonId}</p>
    </div>
  );
}

export default Test;
