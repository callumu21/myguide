const Site = require("../siteQuery");

exports.retrieveSites = async (
  author_id,
  site_id,
  sort_by = "updatedAt",
  order = "desc"
) => {
  const validSortQueries = ["updatedAt", "siteName"];

  if (!validSortQueries.includes(sort_by))
    return Promise.reject({ status: 400, msg: "Invalid sort by query" });

  const validOrderQueries = ["desc", "asc"];

  if (!validOrderQueries.includes(order))
    return Promise.reject({ status: 400, msg: "Invalid order query" });

  const ids = site_id ? JSON.parse(site_id) : site_id;

  if (site_id && !Array.isArray(ids)) {
    return Promise.reject({
      status: 400,
      msg: "Site IDs should be an array",
    });
  }

  return Site.find({
    ...(author_id ? { authorId: author_id } : {}),
    ...(site_id ? { siteId: { $in: ids } } : {}),
  })
    .sort({ [sort_by]: order === "desc" ? -1 : 1 })
    .then((sites) => {
      const msg = author_id ? "Author ID does not exist" : "No sites found";

      if (!sites.length) {
        return Promise.reject({
          status: 404,
          msg: msg,
        });
      }
      return sites;
    });
};

exports.addAnotherSite = async (newSite) => {
  const correctForm = {
    authorId: "number",
    siteName: "string",
    siteDescription: "string",
    siteImage: "string",
    siteAddress: "string",
    latitude: "number",
    longitude: "number",
    contactInfo: "string",
    websiteLink: "string",
  };

  const equals = (array1, array2) =>
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index]);

  const newSiteKeys = Object.keys(newSite).sort();
  const correctSiteKeys = Object.keys(correctForm).sort();

  if (!equals(newSiteKeys, correctSiteKeys)) {
    return Promise.reject({
      status: 400,
      msg: "Missing Input Information!",
    });
  } else if (
    !Object.keys(newSite).every(
      (key) => typeof newSite[key] === correctForm[key]
    )
  ) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Input!",
    });
  }

  return Site.create(newSite).then((createdSite) => {
    return createdSite;
  });
};

exports.fetchedSiteById = async (site_id) => {
  try {
    const site = await Site.find({ siteId: site_id });
    return site.length
      ? site
      : Promise.reject({ status: 404, msg: "Site ID does not exist" });
  } catch (err) {
    next(err);
  }
};

exports.updateSiteById = async (site_id, updates) => {
  try {
    const updatedSite = await Site.updateOne(
      { siteId: site_id },
      { $set: updates }
    );
    return updatedSite;
  } catch (err) {
    next(err);
  }
};

exports.removeSiteById = async (site_id) => {
  try {
    const res = await Site.deleteOne({ siteId: site_id });
    return res.deletedCount === 0
      ? Promise.reject({ status: 404, msg: "Site ID does not exist" })
      : null;
  } catch (err) {
    next(err);
  }
};
