const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, error: `Movie cannot be found.` });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = await moviesService.list(is_showing);
  res.status(201).json({ data });
}

function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};