import { Server } from "socket.io"

let io;

export default function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id, "socket server is connected");
    });

    io.on("disconnected", (socket) => {
        console.log(socket.id, "sokect is disconnected")
    })
    return io;
};


export const getIo = () => io;