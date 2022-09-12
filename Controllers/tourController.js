const {
  fetchTours,
  fetchTourById,
  addTour,
  removeTour,
  changeTour,
} = require("../Models/tourModel");
const generateUniqueId = require("generate-unique-id");

exports.getTours = async (req, res, next) => {
  try {
    const { author_id, tour_code, sort_by, order } = req.query;
    const tours = await fetchTours(author_id, tour_code, sort_by, order);
    res.status(200).send(tours);
  } catch (err) {
    next(err);
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const { tour_id } = req.params;
    const tour = await fetchTourById(tour_id);
    res.status(200).send(tour);
  } catch (err) {
    next(err);
  }
};

exports.postTour = async (req, res, next) => {
  try {
    const newTour = req.body;
    const id = generateUniqueId({
      length: 6,
      useLetters: false,
    });
    newTour.tourCode = Number(id);
    const addedTour = await addTour(newTour);
    res.status(201).send(addedTour);
  } catch (err) {
    next(err);
  }
};

exports.updateTour = async (req, res, next) => {
  const { tour_id } = req.params;
  try {
    const updates = req.body;
    await changeTour(tour_id, updates);
    const tour = await fetchTourById(tour_id);
    res.status(200).send(tour);
  } catch (err) {
    next(err);
  }
};

exports.deleteTour = async (req, res, next) => {
  const { tour_id } = req.params;
  try {
    await removeTour(tour_id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
