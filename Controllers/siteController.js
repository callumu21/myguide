const {
  retrieveSites,
  addAnotherSite,
  fetchedSiteById,
  updateSiteById,
  removeSiteById,
} = require("../Models/siteModel");

exports.getSites = async (req, res, next) => {
  try {
    const { author_id, site_id, sort_by, order } = req.query;
    const sites = await retrieveSites(author_id, site_id, sort_by, order);
    res.status(200).send(sites);
  } catch (err) {
    next(err);
  }
};

exports.postSite = async (req, res, next) => {
  try {
    const newSite = req.body;
    const addedSite = await addAnotherSite(newSite);
    res.status(201).send(addedSite);
  } catch (err) {
    next(err);
  }
};

exports.getSiteById = async (req, res, next) => {
  try {
    const { site_id } = req.params;
    const selectedSiteById = await fetchedSiteById(site_id);
    res.status(200).send(selectedSiteById);
  } catch (err) {
    next(err);
  }
};

exports.patchSiteById = async (req, res, next) => {
  const { site_id } = req.params;
  try {
    const updates = req.body;
    await updateSiteById(site_id, updates);
    const updatedSite = await fetchedSiteById(site_id);
    res.status(200).send(updatedSite);
  } catch (err) {
    next(err);
  }
};

exports.deleteSiteById = async (req, res, next) => {
  const { site_id } = req.params;

  try {
    await removeSiteById(site_id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
