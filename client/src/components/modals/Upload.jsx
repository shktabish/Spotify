import { useState } from "react"
import { IoClose } from "react-icons/io5"
import api from "../../utils/axios"

const Upload = ({ isUploadOpen, setIsUploadOpen, setSongs }) => {
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [songUpload, setSongUpload] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)

    const uploadFiles = async () => {
        const formData = new FormData()

        formData.append("artist", artist)
        formData.append("title", title)
        formData.append("song", songUpload)
        formData.append("coverImage", imageUpload)

        try {
            const res = await api.post('/song/', formData)

            setArtist('')
            setTitle('')
            setSongUpload(null)
            setImageUpload(null)
            setSongs((prev) => [...prev, res.data.song])
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await uploadFiles()
            setIsUploadOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
 
    return (
        <div className={`h-full w-full bg-black/75 fixed flex justify-center items-center ${isUploadOpen? "block" : "hidden"}`}>
            <div className="bg-[#232123] w-[405px] max-sm:w-[335px] flex flex-col items-center gap-2 px-3 py-4 rounded-md relative">
                <p className="text-2xl font-semibold text-white ">Upload any song</p>
                <form onSubmit={handleSubmit} className="flex flex-col border-t-[1px] border-[#363436] mt-4 pt-4">
                    <label className="text-white my-4">
                        <input type="file" className="hidden" onChange={(e) => setSongUpload(e.target.files[0])}/>
                        {songUpload ? (
                            <>
                                <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select song</span>
                                <span className="text-ellipsis">{songUpload.name}</span>
                            </>
                        ) : (
                            <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select song</span>
                        )}
                    </label>
                    <label className="text-white my-4">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])}/>
                        {imageUpload ? (
                            <>
                                <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select cover image</span>
                                <span className="text-ellipsis">{imageUpload.name}</span>
                            </>
                        ) : (
                            <span className="bg-[#2A282A] py-2 px-4 rounded-sm w-max">Select cover image</span>
                        )}
                    </label>
                    <label className="block text-[#b3b3b3]">Title</label>
                    <input 
                        type="text"
                        placeholder="Song title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-96 max-sm:w-80 text-white p-2 border-[1px] bg-[#1D1C1D] mt-2 mb-3 rounded-md border-[#363436] focus:outline-none"
                    />
                    <label className="block text-[#b3b3b3]">Artist Name</label>
                    <input 
                        type="text"
                        placeholder="Artist name"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="w-96 max-sm:w-80 text-white p-2 border-[1px] bg-[#1D1C1D] mt-2 mb-3 rounded-md border-[#363436] focus:outline-none"
                    />
                    <button className="w-96 max-sm:w-80 p-2 bg-[#363436] text-white rounded-md my-4">Upload</button>
                </form>
                <IoClose 
                    className="absolute top-3 right-3 fill-[#363436] text-2xl cursor-pointer" 
                    onClick={() => setIsUploadOpen(false)}
                />
            </div>
        </div>
    )
}

export default Upload
