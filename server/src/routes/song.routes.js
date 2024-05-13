const express = require("express")
const upload = require("../middlewares/multer.middleware")
const verifyJWT = require("../middlewares/auth.middleware")
const { uploadSongs, getAllSongs } = require("../controllers/song.controller")

const router = express.Router()

router.route("/")
.post(upload.fields([
    {
        name: "song",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), verifyJWT, uploadSongs)
.get(getAllSongs)

module.exports = router