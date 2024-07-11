require("dotenv").config()
const connectDB = require("./db/db")
const { app } = require("./app")
const socket = require("socket.io")
const socketUtility = require("./socket")

const PORT = process.env.PORT || 8000

connectDB().
then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })

    const io = new socket.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            credentials: true
        }
    })

    io.on("connection", (socket) => {       
        socketUtility(socket)
    })
})
.catch((err) => {
    console.log("Error in connecting MongoDB ", err)
})
