const Tour = require("../tourQuery");

exports.fetchTours = async (
  author_id,
  tour_code,
  sort_by = "updatedAt",
  order = "desc"
) => {
  const validSortQueries = ["updatedAt", "tourCode", "createdAt", "tourName"];

  if (!validSortQueries.includes(sort_by))
    return Promise.reject({ status: 400, msg: "Invalid sort by query" });

  const validOrderQueries = ["desc", "asc"];

  if (!validOrderQueries.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  return Tour.find({
    ...(author_id ? { authorId: author_id } : {}),
    ...(tour_code ? { tourCode: tour_code } : {}),
  })
    .sort({ [sort_by]: order === "desc" ? -1 : 1 })
    .then((tours) => {
      if (!tours.length) {
        const msg =
          author_id && tour_code
            ? "Author ID or tour code are invalid"
            : author_id
            ? "Author ID does not exist"
            : "Tour code does not exist";
        return Promise.reject({
          status: 404,
          msg: msg,
        });
      }
      return tours;
    });
};

exports.fetchTourById = async (tour_id) => {
  return Tour.find({ tourId: tour_id }).then((tour) => {
    if (!tour.length) {
      return Promise.reject({ status: 404, msg: "Tour does not exist" });
    }
    return tour;
  });
};

exports.addTour = async (newTour) => {
  const correctForm = {
    authorId: "number",
    tourName: "string",
    tourDescription: "string",
    tourImage: "string",
    tourSites: "object",
    tourCode: "number",
  };

  const equals = (array1, array2) =>
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index]);

  if (!equals(Object.keys(newTour), Object.keys(correctForm))) {
    return Promise.reject({
      status: 400,
      msg: "Missing Input Information!",
    });
  } else if (
    !Object.keys(newTour).every(
      (key) => typeof newTour[key] === correctForm[key]
    )
  ) {
    return Promise.reject({
      status: 400,
      msg: "Invalid input information!",
    });
  }

  const createdTour = await Tour.create(newTour);
  return createdTour;
};

exports.changeTour = async (tour_id, updates) => {
  try {
    const updatedTour = await Tour.updateOne(
      { tourId: tour_id },
      { $set: updates }
    );
    return updatedTour;
  } catch (err) {
    next(err);
  }
};

exports.removeTour = async (tour_id) => {
  try {
    const res = await Tour.deleteOne({ tourId: tour_id });
    return res.deletedCount === 0
      ? Promise.reject({ status: 404, msg: "Tour does not exist" })
      : null;
  } catch (err) {
    next(err);
  }
};
