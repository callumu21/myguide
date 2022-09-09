const {
  fetchTours,
  fetchTourById,
  addTour,
  removeTour,
  changeTour,
} = require("../Models/tourModel");
const generateUniqueId = require("generate-unique-id");

exports.getTours = async (req, res, next) => {
  const { author_id } = req.query;
  const tours = await fetchTours(author_id).catch((err) => next(err));
  res.status(200).send(tours);
};

exports.getTourById = async (req, res, next) => {
  const { tour_id } = req.params;
  const tour = await fetchTourById(tour_id).catch((err) => next(err));
  res.status(200).send(tour);
};

exports.postTour = async (req, res, next) => {
  const newTour = req.body;
  const id = generateUniqueId({
    length: 6,
    useLetters: false,
  });
  newTour.tourCode = Number(id);
  const addedTour = await addTour(newTour).catch((err) => next(err));
  res.status(201).send(addedTour);
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
