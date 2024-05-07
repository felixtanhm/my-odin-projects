const axios = require("axios");
const Pokemons = require("../models/pokemons");
const PokeDetails = require("../models/pokeDetails");

exports.pokeList = async function (req, res, next) {
  try {
    const count = await Pokemons.countDocuments().exec();
    const allPokemon = await Pokemons.find({ dexId: { $gt: req.query.cursor } })
      .sort({ dexId: 1 })
      .limit(24)
      .exec();

    res.status(200).json({
      totalCount: count,
      data: allPokemon,
    });
  } catch (error) {
    return next(error);
  }
};

exports.pokeDetails = async function (req, res, next) {
  try {
    const pokemon = await Pokemons.findOne({ dexId: req.params.dexId })
      .populate("details")
      .exec();
    if (pokemon === null) {
      const error = new Error("Pokemon not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(pokemon);
  } catch (error) {
    return next(error);
  }
};
