const mongoose = require("mongoose")

const Schema = mongoose.Schema

const songSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        song: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Song = mongoose.model("Song", songSchema)

module.exports = Song