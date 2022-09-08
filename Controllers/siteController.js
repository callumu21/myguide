const { retrieveSites, addAnotherSite } = require("../Models/siteModel");

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
