const toursRouter = require("express").Router();
const {
  getTours,
  postTour,
  getTourById,
  deleteTour,
  updateTour,
} = require("../Controllers/tourController");

toursRouter.route("/").get(getTours).post(postTour);

toursRouter
  .route("/:tour_id")
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = toursRouter;
