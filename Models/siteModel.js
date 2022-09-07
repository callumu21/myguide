const Site = require("../siteQuery");

exports.retrieveSites = async (author_id) => {
  if (author_id) {
    return Site.find({ authorID: author_id }).then((sites) => {
      return sites;
    });
  } else {
    return Site.find().then((sites) => {
      return sites;
    });
  }
};

exports.addAnotherSite = async (newSite) => {
  return Site.create(newSite).then((createdSite) => {
    return createdSite;
  });
};
