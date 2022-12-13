import { Server } from 'socket.io'
import { useSocketServer } from 'socket-controllers'

export default (httpServer) => {
    const io = new Server(httpServer, { cors: { origin: '*' } })

    useSocketServer(io, { controllers: [__dirname + '/controllers/*.ts'] })

    return io
}