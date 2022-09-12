const sitesRouter = require("express").Router();
const {
  getSites,
  postSite,
  getSiteById,
  patchSiteById,
  deleteSiteById,
} = require("../Controllers/siteController");

sitesRouter.route("/").get(getSites).post(postSite);

sitesRouter
  .route("/sites/:site_id")
  .get(getSiteById)
  .patch(patchSiteById)
  .delete(deleteSiteById);

module.exports = sitesRouter;
