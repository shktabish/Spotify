import { useEffect, useState, useCallback } from "react"
import { IoClose } from "react-icons/io5"
import { FaRegClipboard } from "react-icons/fa"
import { IoReload } from "react-icons/io5"
import { CiLogin } from "react-icons/ci"
import { toast } from "sonner"
import socket from "../../utils/socket"

const ListenWithFriends = ({ isModalOpen, setIsModalOpen, roomID, setRoomID }) => {
    const [copied, setCopied] = useState(false)
    const [joinRoomID, setJoinRoomID] = useState('')

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
        socket.emit("create-room", roomID)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [roomID])

    const handleJoinRoom = (e) => {
        e.preventDefault()

        if (!joinRoomID) {
            return toast.error("Room ID is required")
        }

        setRoomID(joinRoomID)
        socket.emit("join-room", joinRoomID)
    }

    return (
        <div className={`h-screen w-full bg-black/75 fixed flex justify-center items-center ${isModalOpen ? "block" : "hidden"}`}>
            <div className="bg-[#232123] w-[405px] max-sm:w-[90%] max-sm:-ml-4 flex flex-col gap-2 px-3 py-4 rounded-md relative">
                <p className="text-2xl font-semibold text-white pb-4 border-b-[1px] w-full border-[#363436] text-center">
                    Listen With Friends
                </p>
                <div className="text-xl text-white font-semibold">Create a room</div>
                <div className="text-[#b3b3b3]">Share this link with your friends and listen to music together.</div>
                {copied && <div className="text-[#0BDA92]">Copied to clipboard</div>}
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
                <div className="flex items-center my-4">
                    <div className="flex-grow bg bg-[#b3b3b3] h-[1px]"></div>
                    <div className="flex-grow-0 mx-5 text-white">OR</div>
                    <div className="flex-grow bg bg-[#b3b3b3] h-[1px]"></div>
                </div>
                <div className="text-xl text-white font-semibold">Join a room</div>
                <div className="text-[#b3b3b3]">Enter the room ID to join one.</div>
                <form onSubmit={handleJoinRoom} className="flex items-center gap-3 mb-4">
                    <input 
                        type="text" 
                        value={joinRoomID} 
                        onChange={(e) => setJoinRoomID(e.target.value)}
                        className="w-full bg-[#363436] text-white p-2 rounded-md" />
                    <button className="bg-[#0BDA92] p-1 rounded-full">
                        <CiLogin
                            className="fill-black text-3xl cursor-pointer"
                            aria-label="Join room"
                        />
                    </button>
                </form>
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
