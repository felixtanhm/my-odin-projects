#! /usr/bin/env node
const axios = require("axios");

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://abc:123@cluster0.wiqnlaq.mongodb.net/pokemon?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Pokemons = require("./models/pokemons");
const PokeDetails = require("./models/pokeDetails");
const Favorites = require("./models/favorites");
const Users = require("./models/users");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=151"
  );
  let expandList = [];
  if (response.status === 200) {
    expandList = await Promise.all(
      response.data.results.map(async (item) => {
        try {
          const details = await axios.get(item.url);
          item = { ...item, ...details.data };
          return item;
        } catch (error) {
          console.log({ ...item, error });
        }
      })
    );
    expandList = await Promise.all(
      expandList.map(async (item) => {
        try {
          const species = await axios.get(item.species.url);
          item = { ...item, ...species.data };
          return item;
        } catch (error) {
          console.log({ ...item, error });
        }
      })
    );
  }
  expandList.forEach(async (item) => {
    const { newPokemon, newPokeDetails } = processPokeData(item);
    const detailsRef = await createPokeDetails(newPokeDetails);
    await createPokemon(newPokemon, detailsRef);
  });

  createNewUser();
}

function processPokeData(data) {
  const newPokemon = {
    name: data.name,
    dexId: data.id,
    avatar: data.sprites.front_default,
    types: data.types.map((typeObj) => {
      return typeObj.type.name;
    }),
  };

  const newPokeDetails = {
    height: data.height,
    weight: data.weight,
    has_gender: Boolean(data.gender_rate),
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    special_attack: data.stats[3].base_stat,
    special_defense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    abilities: data.abilities.map((aObj) => {
      return aObj.ability.name;
    }),
  };
  return { newPokemon, newPokeDetails };
}

async function createPokeDetails(newPokeDetails) {
  const pokeDetails = new PokeDetails(newPokeDetails);
  await pokeDetails.save();
  console.log(`\nPoke Details Added`);
  return pokeDetails;
}

async function createPokemon(newPokemon, detailsRef) {
  const pokemon = new Pokemons({ ...newPokemon, details: detailsRef });
  await pokemon.save();
  console.log(`Pokemon: ${pokemon.name}`);
  console.log(`-------------`);
}

async function createNewUser() {
  const newUser = new Users({
    name: "Felix Tan",
    email: "felixtanhm@gmail.com",
  });

  const newFavorites = new Favorites({
    user: newUser,
  });

  await newUser.save();
  await newFavorites.save();
  console.log("Initial User Created");
}
