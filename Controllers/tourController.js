const { fetchTours, addTour } = require("../Models/tourModel");
const generateUniqueId = require("generate-unique-id");

exports.getTours = async (req, res) => {
  const { author_id } = req.query;
  const tours = await fetchTours(author_id);
  res.status(200).send(tours);
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
