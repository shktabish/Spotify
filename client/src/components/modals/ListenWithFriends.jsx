import { useEffect, useState, useCallback } from "react"
import { IoClose } from "react-icons/io5"
import { FaRegClipboard } from "react-icons/fa"
import { IoReload } from "react-icons/io5"
import { toast } from "sonner"

const ListenWithFriends = ({ isModalOpen, setIsModalOpen }) => {
    const [copied, setCopied] = useState(false)
    const [roomID, setRoomID] = useState(() => {
        return localStorage.getItem("roomID") || ''
    })

    const generateRoomID = useCallback(() => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let token = ''
        for (let i = 0; i < 20; i++) {
            token += chars[Math.floor(Math.random() * chars.length)]
        }
        setRoomID(token)
        localStorage.setItem("roomID", token)
    }, [])

    useEffect(() => {
        if (!roomID) {
            generateRoomID()
        }
    }, [roomID, generateRoomID])

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(roomID)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [roomID])

    return (
        <div className={`h-screen w-full bg-black/75 fixed flex justify-center items-center ${isModalOpen ? "block" : "hidden"}`}>
            <div className="bg-[#232123] w-[405px] max-sm:w-[90%] max-sm:-ml-4 flex flex-col gap-2 px-3 py-4 rounded-md relative">
                <p className="text-2xl font-semibold text-white pb-4 border-b-[1px] w-full border-[#363436] text-center">
                    Listen With Friends
                </p>
                <div className="text-xl text-white font-semibold">Create a room</div>
                <div className="text-[#b3b3b3]">Share this link with your friends and listen to music together.</div>
                {copied && <div className="text-[#1db954]">Copied to clipboard</div>}
                <div className="flex items-center gap-3">
                    <input type="text" value={roomID} readOnly className="w-full bg-[#363436] text-white p-2 rounded-md" />
                    <FaRegClipboard
                        className="fill-[#b3b3b3] text-2xl cursor-pointer"
                        aria-label="Copy to clipboard"
                        onClick={handleCopy}
                    />
                    <IoReload
                        className="stroke-[#b3b3b3] fill-[#b3b3b3] text-3xl cursor-pointer"
                        aria-label="Generate new room ID"
                        onClick={generateRoomID}
                    />
                </div>
                <IoClose
                    className="absolute top-3 right-3 fill-[#363436] text-2xl cursor-pointer"
                    aria-label="Close modal"
                    onClick={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    )
}

export default ListenWithFriends
