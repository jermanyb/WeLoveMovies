const knex = require("../db/connection");

function list() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct("mt.movie_id")
    .select("m.*")
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({ movie_id: movieId })
    .first();
}

module.exports = {
  list,
  read,
};