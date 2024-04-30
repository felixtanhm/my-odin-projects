import PokeList from "./PokeList";

function Home({ text }) {
  return (
    <div>
      <PokeList />
      <p>{text}</p>
    </div>
  );
}

export default Home;
