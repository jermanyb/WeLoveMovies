const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .distinct("review_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((data) => {
      const formattedData = data.map((review) => addCritic(review));
      return formattedData;
    });
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where("r.review_id", updatedReview.review_id)
        .first()
        .then(addCritic)
        .then((updatedReview) => updatedReview);
    });
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};