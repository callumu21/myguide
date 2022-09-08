const Tour = require("../tourQuery");

exports.fetchTours = async (author_id) => {
  if (author_id) {
    return Tour.find({ authorId: author_id }).then((tours) => {
      return tours;
    });
  } else {
    return Tour.find().then((tours) => {
      return tours;
    });
  }
};

exports.fetchTourById = async (tour_id) => {
  return Tour.find({ tourId: tour_id }).then((tour) => {
    return tour;
  });
};

exports.addTour = async (newTour) => {
  return Tour.create(newTour).then((createdTour) => {
    return createdTour;
  });
};

exports.changeTour = async (tour_id, updates) => {
  return Tour.updateOne({ tourId: tour_id }, { $set: updates });
};

exports.removeTour = async (tour_id) => {
  return Tour.deleteOne({ tourId: tour_id });
};
