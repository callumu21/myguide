const { fetchTours, addTour } = require("../Models/tourModel");
const generateUniqueId = require("generate-unique-id");

exports.getTours = async (req, res, next) => {
  const { author_id } = req.query;
  const tours = await fetchTours(author_id).catch((err) => next(err));
  res.status(200).send(tours);
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
