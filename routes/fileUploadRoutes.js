require("dotenv").config();
const express = require("express");
const router = express.Router();
const Image = require("../models/image");
const multer = require("multer");
var AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), function(req, res) {
  const file = req.file;
  console.log("this is the file", req.file)
  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  
  const awsURL = "https://bespoke-nails.s3-ap-southeast-2.amazonaws.com/"
  // console.log(process.env.AWS_ACCESS_KEY_ID);
  // console.log(process.env.AWS_SECRET_ACCESS_KEY);

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname + Date.now(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log(err.message)
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send(awsURL + params.Key);
      console.log(awsURL + params.Key)

      // const newFileUploaded = {
      //   description: req.body.description,
      //   fileLink: s3FileURL + file.originalname,
      //   s3_key: params.Key
      // };

      // const image = new Image(newFileUploaded);
      // image.save(function(error, newFile) {
      //   if (error) {
      //     throw error;
      //   }
      // });
    }
  });
});

module.exports = router 