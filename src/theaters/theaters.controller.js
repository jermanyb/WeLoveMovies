const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const {movieId} = req.params;
  //const { movie } = res.locals;
  const data = await theatersService.list(movieId);
  //const data = await theatersService.list(movie.movie_id);
  res.status(201).json({ data });
}

async function listTheaters(req, res, next) {
  const data = await theatersService.listTheaters();
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listTheaters: asyncErrorBoundary(listTheaters),
};