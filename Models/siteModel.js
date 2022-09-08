const Site = require("../siteQuery");

exports.retrieveSites = async (author_id, site_ids) => {
  if (author_id) {
    return Site.find({ authorID: author_id }).then((sites) => {
      if (!sites.length) {
        return Promise.reject({ status: 404, msg: "Author ID does not exist" });
      }
      return sites;
    });
  } else if (site_ids) {
    const ids = JSON.parse(site_ids);
    if (!Array.isArray(ids))
      return Promise.reject({
        status: 400,
        msg: "Site IDs should be an array",
      });
    return Site.find({ siteId: { $in: ids } }).then((sites) => {
      if (!sites.length) {
        return Promise.reject({ status: 404, msg: "No sites found" });
      }
      return sites;
    });
  } else {
    return Site.find().then((sites) => {
      return sites;
    });
  }
};

exports.addAnotherSite = async (newSite) => {
  if (
    newSite.authorID === undefined ||
    newSite.siteName === undefined ||
    newSite.siteDescription === undefined ||
    newSite.siteImage === undefined ||
    newSite.siteAddress === undefined ||
    newSite.latitude === undefined ||
    newSite.longitude === undefined ||
    newSite.contactInfo === undefined ||
    newSite.websiteLink === undefined
  ) {
    return Promise.reject({ status: 400, msg: "Missing Input Information!" });
  } else if (
    typeof newSite.authorID !== "number" ||
    typeof newSite.siteName !== "string" ||
    typeof newSite.siteDescription !== "string" ||
    typeof newSite.siteImage !== "string" ||
    typeof newSite.siteAddress !== "string" ||
    typeof newSite.latitude !== "number" ||
    typeof newSite.longitude !== "number" ||
    typeof newSite.contactInfo !== "string" ||
    typeof newSite.websiteLink !== "string"
  ) {
    return Promise.reject({ status: 400, msg: "Invalid Input" });
  }
  return Site.create(newSite).then((createdSite) => {
    return createdSite;
  });
};

exports.fetchedSiteById = async (site_id) => {
  console.log(site_id);
  return Site.find({ siteId: site_id }).then((siteById) => {
    return siteById;
  });
};

exports.updateSiteById = async (site_id, updates) => {
  return Site.updateOne({ siteId: site_id }, { $set: updates }).then(
    (updatedSite) => {
      return updatedSite;
    }
  );
};

exports.removeSiteById = async (site_id) => {
  return Site.deleteOne({ siteId: site_id });
};
