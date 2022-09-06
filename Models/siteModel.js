const site = require("../siteQuery");

exports.retrieveSites = async (author_id) => {
  if (author_id) {
    return site.find({ authorID: author_id }).then((sites) => {
      return sites;
    });
  } else {
    return site.find().then((sites) => {
      return sites;
    });
  }
};

exports.addAnotherSite = async (newSite) => {
  return site.create(newSite).then((createdSite) => {
    return createdSite;
  });
};
