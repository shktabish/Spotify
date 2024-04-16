const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken

        if(!token) {
            return res.status(401).json({ error: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id)
        
        if(!user) {
            return res.status(401).json({ error: "Invalid access token" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error while verifying the JWT token ", error)
        return res.status(500).json(error)
    }
}

module.exports = verifyJWT