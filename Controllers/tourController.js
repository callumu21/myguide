const {
  fetchTours,
  fetchTourById,
  addTour,
  removeTour,
  changeTour,
} = require("../Models/tourModel");
const generateUniqueId = require("generate-unique-id");

exports.getTours = async (req, res) => {
  const { author_id } = req.query;
  const tours = await fetchTours(author_id);
  res.status(200).send(tours);
};

exports.getTourById = async (req, res) => {
  const { tour_id } = req.params;
  const tour = await fetchTourById(tour_id);
  res.status(200).send(tour);
};

exports.postTour = async (req, res) => {
  const newTour = req.body;
  const id = generateUniqueId({
    length: 6,
    useLetters: false,
  });
  newTour.tourCode = id;
  const addedTour = await addTour(newTour);
  res.status(201).send(addedTour);
};

exports.updateTour = async (req, res) => {
  const { tour_id } = req.params;
  const updates = req.body;
  await changeTour(tour_id, updates);
  const tour = await fetchTourById(tour_id);
  res.status(200).send(tour);
};

exports.deleteTour = async (req, res) => {
  const { tour_id } = req.params;
  await removeTour(tour_id);
  res.sendStatus(204);
};
