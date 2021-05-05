const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function list(req, res, next) {
  const { movieId } = req.params;
  //const { movie } = res.locals;
  const data = await reviewsService.list(movieId);
  //const data = await reviewsService.list(movie.movie_id);
  res.status(201).json({ data });
}

function read(req, res, next) {
  const { review } = res.locals;
  res.json({ data: review });
}

async function update(req, res, next) {
  const reviewToUpdate = {
    ...res.locals.review,
    content: req.body.data.content,
  };
  const updatedReview = await reviewsService.update(reviewToUpdate);
  res.json({ data: updatedReview });
}

async function destroy(req, res, next) {
  const reviewId = Number(req.params.reviewId);
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  reviewExists,
};