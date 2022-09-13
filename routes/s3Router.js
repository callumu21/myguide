const s3Router = require("express").Router();
const { uploadImage } = require("../Controllers/s3Controller");

s3Router.route("/").post(uploadImage);

module.exports = s3Router;
