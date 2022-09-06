const { retrieveSites, addAnotherSite } = require("../Models/siteModel");

exports.getSites = async (req, res) => {
  const { author_id } = req.query;
  const sites = await retrieveSites(author_id);
  res.status(200).send(sites);
};

exports.postSite = async (req, res) => {
  const newSite = req.body;
  const addedSite = await addAnotherSite(newSite);
  res.status(201).send(addedSite);
};
