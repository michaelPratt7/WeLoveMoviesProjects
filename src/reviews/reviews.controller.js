const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;
    const review = await service.read(reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: "Review cannot be found"
    });
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id)
    res.sendStatus(204);
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
     const data = await service.update(updatedReview);
  res.json({ data: await service.read(updatedReview.review_id)});
}



module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}