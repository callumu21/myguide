const site = require("../siteQuery");

exports.retrieveSites = async () => {
  return site.find().then((sites) => {
    return sites;
  });
};

exports.siteUsers = async (userId) => {
  const id = userId.user_id;
  return site.find({ authorID: id }).then((sitesByID) => {
    return sitesByID;
  });
};

exports.addAnotherSite = async (newSite) => {
  return site.create(newSite).then((createdSite) => {
    return createdSite;
  });
};
