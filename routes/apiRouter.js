const apiRouter = require("express").Router();
const sitesRouter = require("./sitesRouter");
const toursRouter = require("./toursRouter");
const s3Router = require("./s3Router");

apiRouter.use("/sites", sitesRouter);

apiRouter.use("/tours", toursRouter);

apiRouter.use("/s3", s3Router);

module.exports = apiRouter;
