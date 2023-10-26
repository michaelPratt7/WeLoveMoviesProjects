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


module.exports = {
    list,
}