let io

export const init = httpServer => {
    io = require("socket.io")(httpServer)
    return io
}
export const getSocket = () => {
    if (!io) {
        console.log("Io not found")
    }
    return io
}
