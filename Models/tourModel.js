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

exports.addTour = async (newTour) => {
  return Tour.create(newTour).then((createdTour) => {
    return createdTour;
  });
};
