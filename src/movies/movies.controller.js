const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({data: await service.list()});
}

async function listMoviesShowing(req, res, next) {
    res.json({data: await service.listMoviesShowing()});
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    listMoviesShowing: [asyncErrorBoundary(listMoviesShowing)],
}