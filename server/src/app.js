const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
const userRouter = require("./routes/user.routes")
const songRouter = require("./routes/song.routes")

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/song", songRouter)

module.exports = { app }