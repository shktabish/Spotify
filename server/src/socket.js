const userRooms = new Map()

const socketUtility = (socket) => {
    socket.on("create-room", (roomID) => {
        const userID = socket.id
        const currentRoom = userRooms.get(userID)
        if (currentRoom) {
            socket.leave(currentRoom)
        }
        socket.join(roomID)
        userRooms.set(userID, roomID)
        // console.log(`User created and joined room ${roomID}`)
    })

    socket.on("join-room", (roomID) => {
        const userID = socket.id
        const currentRoom = userRooms.get(userID)
        if (currentRoom) {
            socket.leave(currentRoom)
        }
        socket.join(roomID)
        userRooms.set(userID, roomID)
        // console.log(`User joined room ${roomID}`)
    })

    socket.on("disconnect", () => {
        const userID = socket.id
        const currentRoom = userRooms.get(userID)
        if (currentRoom) {
            socket.leave(currentRoom)
            userRooms.delete(userID)
            // console.log(`User ${userID} left room ${currentRoom}`)
        }
    })

    socket.on("play", (roomID) => {
        // console.log(`Play event emitted in room ${roomID}`)
        socket.to(roomID).emit("play")
    })

    socket.on("pause", (roomID) => {
        // console.log(`Pause event emitted in room ${roomID}`)
        socket.to(roomID).emit("pause")
    })

    socket.on("seek", (roomID, time) => {
        socket.to(roomID).emit("seek", time)
    })

    socket.on("change-song", (data) => {
        const { roomID, songIndex } = data
        if (roomID && songIndex !== undefined) {
            // console.log(`Change song event emitted in room ${roomID} with song index ${songIndex}`)
            socket.to(roomID).emit("change-song", songIndex)
        }
    })
}

module.exports = socketUtility
