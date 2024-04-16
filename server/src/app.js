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
app.use(cookieParser())

//routes import
const userRouter = require("./routes/user.routes")

//routes declaration
app.use("/api/v1/user", userRouter)

module.exports = { app }