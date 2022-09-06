const {
  retrieveSites,
  siteUsers,
  addAnotherSite,
} = require("../Models/siteModel");

exports.getSites = async (req, res) => {
  const sites = await retrieveSites();
  res.status(200).send(sites);
};

exports.getSiteUsers = async (req, res) => {
  const userId = req.params;
  const allSiteUsers = await siteUsers(userId);
  res.status(200).send(allSiteUsers);
};

exports.postSite = async (req, res) => {
  const newSite = req.body;
  const addedSite = await addAnotherSite(newSite);
  res.status(201).send(addedSite);
};
