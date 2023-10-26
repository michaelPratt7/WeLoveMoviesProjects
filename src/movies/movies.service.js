const knex = require ("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listMoviesShowing() {
    return knex("movies a m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("m.*")
        .where({"mt.is_showing": true});
}

module.exports = {
    list,
    listMoviesShowing,
}