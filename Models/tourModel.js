const Tour = require("../tourQuery");

exports.fetchTours = async (author_id) => {
  if (author_id) {
    return Tour.find({ authorId: author_id }).then((tours) => {
      if (!tours.length) {
        return Promise.reject({ status: 404, msg: "Author ID does not exist" });
      }
      return tours;
    });
  } else {
    return Tour.find().then((tours) => {
      return tours;
    });
  }
};

exports.addTour = async (newTour) => {
  if (
    newTour.authorId === undefined ||
    newTour.tourCode === undefined ||
    newTour.tourName === undefined ||
    newTour.tourDescription === undefined ||
    newTour.tourImage === undefined ||
    newTour.tourSites === undefined
  ) {
    return Promise.reject({ status: 400, msg: "Missing Input Information!" });
  } else if (
    typeof newTour.authorId !== "number" ||
    typeof newTour.tourCode !== "number" ||
    typeof newTour.tourName !== "string" ||
    typeof newTour.tourDescription !== "string" ||
    typeof newTour.tourImage !== "string" ||
    typeof newTour.tourSites !== "object"
  ) {
    return Promise.reject({ status: 400, msg: "Invalid Input" });
  }
  return Tour.create(newTour).then((createdTour) => {
    return createdTour;
  });
};
