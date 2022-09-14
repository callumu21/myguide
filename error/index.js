exports.handleError = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(400).send({ msg: "Invalid Input" });
  }
};
