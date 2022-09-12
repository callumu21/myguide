const apiRouter = require("express").Router();
const sitesRouter = require("./sitesRouter");
const toursRouter = require("./toursRouter");

apiRouter.use("/sites", sitesRouter);

apiRouter.use("/tours", toursRouter);

module.exports = apiRouter;
