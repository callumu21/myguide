const {
  retrieveSites,
  addAnotherSite,
  fetchedSiteById,
  updateSiteById,
  removeSiteById,
} = require("../Models/siteModel");

exports.getSites = async (req, res, next) => {
  const { author_id, site_ids } = req.query;
  const sites = await retrieveSites(author_id, site_ids).catch((err) =>
    next(err)
  );
  res.status(200).send(sites);
};

exports.postSite = async (req, res, next) => {
  const newSite = req.body;
  const addedSite = await addAnotherSite(newSite).catch((err) => next(err));
  res.status(201).send(addedSite);
};

exports.getSiteById = async (req, res, next) => {
  const { site_id } = req.params;
  const selectedSiteById = await fetchedSiteById(site_id).catch((err) =>
    next(err)
  );
  res.status(200).send(selectedSiteById);
};

exports.patchSiteById = async (req, res, next) => {
  const { site_id } = req.params;
  const updates = req.body;

  await updateSiteById(site_id, updates).catch((err) => next(err));
  const updatedSite = await fetchedSiteById(site_id).catch((err) => next(err));
  res.status(200).send(updatedSite);
};

exports.deleteSiteById = async (req, res, next) => {
  const { site_id } = req.params;

  await removeSiteById(site_id);
  res.sendStatus(204);
};
