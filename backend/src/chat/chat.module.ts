import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

// ChatModule to bundle ChatGateway and ChatService together
@Module({
  providers: [ChatGateway, ChatService], // Provide ChatGateway and ChatService to the module
})
export class ChatModule {}
