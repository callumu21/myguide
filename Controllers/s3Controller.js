const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config({ path: ".env.development" });

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "eu-west-2",
});

const upload = (bucketName, fileName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${fileName}.jpg`);
      },
    }),
  });

exports.uploadImage = async (req, res, next) => {
  const uniqueId = uuidv4();

  try {
    const uploadSingle = upload("myguideimages", uniqueId).single("image");
    uploadSingle(req, res, (err) => {
      if (err) {
        res.status(500).send({ msg: "Image could not be uploaded" });
      }
    });
    res.status(200).send({
      link: `https://myguideimages.s3.eu-west-2.amazonaws.com/${uniqueId}.jpg`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
