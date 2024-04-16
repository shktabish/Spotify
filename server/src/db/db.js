const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected! DB host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGO DB connection failed ", error)
        process.exit(1)
    }
}

module.exports = connectDB