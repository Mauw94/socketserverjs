import { Server, Socket } from 'socket.io'
import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO
} from 'socket-controllers'

@SocketController()
export class RoomController {

  /**
   * Listen to join_room event
   * @param socket 
   * @param io 
   * @param message 
   */
  @OnMessage('join_room')
  async joinRoom(
    @ConnectedSocket() socket,
    @SocketIO() io,
    @MessageBody() message
  ) {
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId)
    const currentConnectedroom = Array.from(socket.rooms.values()).filter(r => r === socket.id)

    // check if room we're trying to connect to is full
    if (connectedSockets && connectedSockets.size == 5) {
      socket.emit('room_join_error', {
        error: 'room is full'
      })
    }

    // leave current room
    if (currentConnectedroom) socket.leave(currentConnectedroom[0]);

    // join room
    await socket.join(message.roomId)
  }
}
