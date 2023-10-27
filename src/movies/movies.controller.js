const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({data: await service.list(req.query.is_showing)});
}

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: "Movie cannot be found",
    });
}

async function read(req, res, next) {
    const {movie: data} = res.locals;
    res.json({data});
}

async function moviesByTheater(req, res, next) {
    res.json({data: await service.moviesByTheater(res.locals.movie.movie_id)});
}

async function reviewsByMovie(req, res, next) {
    res.json({data: await service.reviewsByMovie(res.locals.movie.movie_id)});
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    moviesByTheater: [asyncErrorBoundary(movieExists), moviesByTheater],
    reviewsByMovie: [asyncErrorBoundary(movieExists), reviewsByMovie],
}