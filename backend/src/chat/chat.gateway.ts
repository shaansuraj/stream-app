import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for all origins
export class ChatGateway {
  @WebSocketServer()
  server: Server; // WebSocket server instance

  constructor(private chatService: ChatService) {}

  /**
   * Handle a user joining a stream
   * @param client - The socket client
   * @param payload - Contains streamId and userId
   */
  @SubscribeMessage('joinStream')
  handleJoinStream(client: Socket, payload: { streamId: string; userId: string }): void {
    const { streamId, userId } = payload;
    client.join(streamId); // Add the client to the stream room
    this.chatService.joinStream(streamId, userId); // Notify the chat service
    const watchers = this.chatService.getWatchers(streamId); // Get the current watchers
    this.server.to(streamId).emit('watchers', watchers); // Broadcast the updated watchers list
  }

  /**
   * Handle a user leaving a stream
   * @param client - The socket client
   * @param payload - Contains streamId and userId
   */
  @SubscribeMessage('leaveStream')
  handleLeaveStream(client: Socket, payload: { streamId: string; userId: string }): void {
    const { streamId, userId } = payload;
    client.leave(streamId); // Remove the client from the stream room
    this.chatService.leaveStream(streamId, userId); // Notify the chat service
    const watchers = this.chatService.getWatchers(streamId); // Get the current watchers
    this.server.to(streamId).emit('watchers', watchers); // Broadcast the updated watchers list
  }

  /**
   * Handle sending a message in a stream
   * @param client - The socket client
   * @param payload - Contains streamId, message, and userId
   */
  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: { streamId: string; message: string; userId: string }): void {
    const { streamId, message, userId } = payload;
    this.chatService.addMessage(streamId, { message, userId }); // Add message to the chat service
    this.server.to(streamId).emit('message', { message, userId }); // Broadcast the message to the stream
  }

  /**
   * Handle signaling for peer-to-peer communication
   * @param client - The socket client
   * @param payload - Contains streamId, signal, and userId
   */
  @SubscribeMessage('signal')
  handleSignal(client: Socket, payload: { streamId: string; signal: any; userId: string }): void {
    const { streamId, signal, userId } = payload;
    this.server.to(streamId).emit('signal', { signal, userId }); // Broadcast the signal to the stream
  }

  /**
   * Handle ending a stream
   * @param client - The socket client
   * @param payload - Contains streamId
   */
  @SubscribeMessage('endStream')
  handleEndStream(client: Socket, payload: { streamId: string }): void {
    const { streamId } = payload;
    client.leave(streamId); // Remove the client from the stream room
    this.chatService.endStream(streamId); // Notify the chat service
    this.server.to(streamId).emit('streamEnded', { streamId }); // Broadcast that the stream has ended
  }
}
