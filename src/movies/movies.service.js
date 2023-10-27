const knex = require ("../db/connection");

function list(is_showing) {
    if(is_showing) {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .distinct("m.*")
            .where({"mt.is_showing": true});
            }
        else {
            return knex("movies").select("*")
        }
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({"movie_id": movieId})
        .first()
}

function moviesByTheater(movieId) {
    return knex("theaters as t")
       .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
       .select("t.*", "mt.is_showing", "mt.movie_id")
       .where({"mt.movie_id": movieId})
}


module.exports = {
    list,
    read,
    moviesByTheater,
}