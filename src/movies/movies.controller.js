const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    res.json({data: await service.list(req.query.is_showing)});
}


module.exports = {
    list: [asyncErrorBoundary(list)],
}