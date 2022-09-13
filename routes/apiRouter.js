const apiRouter = require("express").Router();
const sitesRouter = require("./sitesRouter");
const toursRouter = require("./toursRouter");
const endpoints = require("../endpoints.json");
const s3Router = require("./s3Router");

apiRouter.use("/sites", sitesRouter);

apiRouter.use("/tours", toursRouter);

apiRouter.use("/s3", s3Router);

apiRouter.route("/").get((req, res, next) => {
  res.status(200).send(endpoints);
});

module.exports = apiRouter;
