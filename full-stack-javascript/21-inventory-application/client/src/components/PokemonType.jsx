import pokemonTypes from "../utils/pokemonTypes";

function PokemonType({ type }) {
  const typeColor = pokemonTypes[type.toLowerCase()];
  const classes =
    "min-w-12 rounded-xl px-2 py-1 text-center text-xs font-bold text-white ";

  return <span className={classes + typeColor}>{type}</span>;
}

export default PokemonType;
