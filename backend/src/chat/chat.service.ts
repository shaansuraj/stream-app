import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private messages: { [key: string]: { message: string; userId: string }[] } = {};
  private watchers: { [key: string]: string[] } = {};

  /**
   * A user joins a stream
   * @param streamId - The ID of the stream
   * @param userId - The ID of the user
   */
  joinStream(streamId: string, userId: string): void {
    if (!this.messages[streamId]) {
      this.messages[streamId] = []; // Initialize messages array if not already present
    }
    if (!this.watchers[streamId]) {
      this.watchers[streamId] = []; // Initialize watchers array if not already present
    }
    if (!this.watchers[streamId].includes(userId)) {
      this.watchers[streamId].push(userId); // Add user to watchers if not already watching
    }
  }

  /**
   * A user leaves a stream
   * @param streamId - The ID of the stream
   * @param userId - The ID of the user
   */
  leaveStream(streamId: string, userId: string): void {
    if (this.watchers[streamId]) {
      this.watchers[streamId] = this.watchers[streamId].filter(id => id !== userId); // Remove user from watchers
    }
  }

  /**
   * Add a message to a stream
   * @param streamId - The ID of the stream
   * @param message - The message and user ID
   */
  addMessage(streamId: string, message: { message: string; userId: string }): void {
    if (!this.messages[streamId]) {
      this.messages[streamId] = []; // Ensure the array is initialized
    }
    this.messages[streamId].push(message); // Add message to the stream
  }

  /**
   * Get all messages from a stream
   * @param streamId - The ID of the stream
   * @returns an array of messages
   */
  getMessages(streamId: string): { message: string; userId: string }[] {
    return this.messages[streamId] || []; // Return an empty array if undefined
  }

  /**
   * Get all watchers of a stream
   * @param streamId - The ID of the stream
   * @returns an array of user IDs
   */
  getWatchers(streamId: string): string[] {
    return this.watchers[streamId] || []; // Return an empty array if undefined
  }

  /**
   * End a stream and clear its data
   * @param streamId - The ID of the stream
   */
  endStream(streamId: string): void {
    delete this.messages[streamId]; // Delete messages for the stream
    delete this.watchers[streamId]; // Delete watchers for the stream
  }
}
