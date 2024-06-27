const User = require('../models/user.model')
const jwt = require("jsonwebtoken")
const run = require("../utils/cloudinary")

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return { accessToken, refreshToken }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong while generating refresh and access tokens" })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
    
        if(!(name && email)) {
            return res.status(400).json({ error: "Name and Email is a required field" })
        }
    
        if(!password || password.length < 6) {
            return res.status(400).json({ error: "Password is required and should be strong (atleast 6 characters long)" })
        }

        const exist = await User.findOne({email})

        if(exist) {
            return res.status(409).json({ error: "User with this email address already exist" })
        }

        let avatarLocalPath;
        console.log("Files: ", req.files)
        if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
            avatarLocalPath = req.files.avatar[0].path
        }

        console.log("Avatar local path: ", avatarLocalPath)

        if(!avatarLocalPath) {
            return res.status(401).json({ error: "Avatar is a required field" })
        }

        const response = await run(avatarLocalPath)

        if (!response || !response.secure_url) {
            return res.status(401).json({ error: "Avatar upload failed or no secure URL returned" })
        }

        const avatar = response.secure_url

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            avatar
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser) {
            return res.status(500).json({error: "Something went wrong while registering the user"})
        }

        return res.status(200).json({user: createdUser, message: "User created successfully"})

    } catch (error) {
        console.log("There was an error during the registration of the user ", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!(email && password)) {
            return res.status(400).json({error: "Email and Password cannot be empty"})
        }
    
        const user = await User.findOne({ email })
    
        if(!user) {
            return res.status(404).json({ error: "Email address isn't registered" })
        }
    
        const passwordMatch = await user.isPasswordCorrect(password)
    
        if(!passwordMatch) {
            return res.status(401).json({error: "Invalid user credentials"})
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)        

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true, 
            secure: true,   
            sameSite: 'None',
            domain: 'https://spotify-nine-tawny.vercel.app'        
        }

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            user: loggedInUser,
            message: "User logged in successfully",
        })
    } catch (error) {
        console.log("An error occured when the user was trying to login", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true, 
            secure: true,   
            sameSite: 'None',
            domain: 'https://spotify-nine-tawny.vercel.app'        
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "User logged out"})
    } catch (error) {
        console.log("An error occurred while logging out the user", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken

        if(!incomingRefreshToken) {
            return res.status(401).json({ error: "Unauthorised request"})
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id)

        if(!user) {
            return res.status(401).json({ error: "Invalid refresh token"})
        }

        if(incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ error: "Refresh token is expired or already used" })
        }

        const options = {
            httpOnly: false,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        return res
        .status(200)
        .cookie("refreshToken", newRefreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json("Access token refreshed")
    } catch (error) {
        console.log("An error occurred while refreshing access token ", error)
        return res.status(500).json({error: error?.message || "Internal server error"})
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user._id
    
        const user = await User.findById(userId).select("-password -refreshToken")
    
        if(!user) {
            return res.status(404).json({ error: "Error fetching the user" })
        }
    
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
}