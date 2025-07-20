const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `pets/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

module.exports = { uploadToS3 };
