const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    m_created_at: ["movies", null, "movie.created_at"],
    m_updated_at: ["movies", null, "movie.updated_at"],
    is_showing: ["movies", null, "movies_theaters.is_showing"],
    theater_id: ["movies", null, "movies_theaters.theater_id"],
  });

  function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select(
        "t.*",
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.image_url",
        "m.created_at as m_created_at",
        "m.updated_at as m_updated_at",
        "mt.is_showing",
        "mt.theater_id",
    )
        .then(reduceMovies)
  }

  module.exports = {
    list
  }