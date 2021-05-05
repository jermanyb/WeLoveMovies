const knex = require("../db/connection");

function list(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ movie_id: movieId });
}

function listTheaters() {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then((data) => {
      const results = {}; // this will become an array when we finish
      data.forEach((row) => { // each piece of data represents a row from the query above
        if (results[row.theater_id]) {  // if the theater exists, resultsObj already includes row.theater_id
          if (row.movie_id) { // and if there is a movie, it will run and if there is not a movieid in the row it wont run
            const movie = {
              movie_id: row.movie_id,
              title: row.title,
              runtime_in_minutes: row.runtime_in_minutes,
              rating: row.rating,
              description: row.description,
              image_url: row.image_url,
              created_at: row.created_at,
              updated_at: row.updated_at,
              is_showing: row.is_showing,
              theater_id: row.theater_id,
            };
            results[row.theater_id].movies.push(movie); // we just need to add movie data to the existing theater object
          }
        } else {  // otherwise if this theater isn't in the obj
          results[row.theater_id] = { // so we need to create a theater obj
            theater_id: row.theater_id,
            name: row.name,
            address_line_1: row.address_line_1,
            address_line_2: row.address_line_2,
            city: row.city,
            state: row.state,
            zip: row.zip,
            created_at: row.created_at,
            updated_at: row.updated_at,
            movies: [],
          };
          if (row.movie_id) { // if there's a movie id, then run. if there is not, then we add movie. and then, this row might also have movie data in it
            const movie = {
              movie_id: row.movie_id,
              title: row.title,
              runtime_in_minutes: row.runtime_in_minutes,
              rating: row.rating,
              description: row.description,
              image_url: row.image_url,
              created_at: row.created_at,
              updated_at: row.updated_at,
              is_showing: row.is_showing,
              theater_id: row.theater_id,
            };
            results[row.theater_id].movies.push(movie); // so we need to add it to the newly created theater
          }
        }
      }); // finally, we need to change the resultsObject to a resultsArray, and return it
      return Object.values(results);
    });
}

module.exports = {
  list,
  listTheaters,
};