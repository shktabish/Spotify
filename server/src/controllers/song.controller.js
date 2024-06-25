const Song = require("../models/song.model")
const run = require("../utils/cloudinary")

const uploadSongs = async (req, res) => {
    try {
        const { title, artist } = req.body

        if(!(title && artist)) {
            return res.status(400).json({ error: "Title and artist name are required fields"})
        }
        
        let songLocalPath;
        let coverImageLocalPath;

        if (req.files && Array.isArray(req.files.song) && req.files.song.length > 0) {
            songLocalPath = req.files.song[0].path;
        }

        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path;
        }

        if (!songLocalPath || !coverImageLocalPath) {
            return res.status(401).json({ error: "Song and cover image are required fields" });
        }

        const songResponse = await run(songLocalPath);
        const coverImageResponse = await run(coverImageLocalPath);

        if (!songResponse || !songResponse.secure_url || !coverImageResponse || !coverImageResponse.secure_url) {
            return res.status(401).json({ error: "Song or cover image upload failed or no secure URL returned" });
        }

        const song = songResponse.secure_url;
        const coverImage = coverImageResponse.secure_url;

        const userId = req.user._id

        const songUploaded = await Song.create({
            title,
            artist,
            song,
            coverImage,
            uploadedBy: userId
        })

        if(!songUploaded) {
            return res.status(500).json({error: "There was an error while storing the song to DB"})
        }

        return res.status(200).json({message: "Song uplaoded successfully", song: songUploaded})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal error while uplaoding the song"})
    }
}

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find({})
        return res.status(200).json(songs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal error while fetching the song"})
    }
}

module.exports = {
    uploadSongs,
    getAllSongs
}