const fs = require("fs")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run(avatarLocalPath) {
  try {
    const result = await cloudinary.uploader.upload(avatarLocalPath, { resource_type: 'auto'});
    console.log(`Successfully uploaded video`);
    console.log(`> Result: ${result.secure_url}`);
    fs.unlinkSync(avatarLocalPath);
    return result
  } catch (e) {
    fs.unlinkSync(avatarLocalPath)
    console.error(e);
  }
}

module.exports = run