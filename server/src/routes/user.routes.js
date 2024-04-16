const express = require("express")
const { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser } = require("../controllers/user.controller")
const verifyJWT = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', verifyJWT, logoutUser)
router.post('/refresh-token', refreshAccessToken)
router.get('/user',verifyJWT, getCurrentUser)

module.exports = router