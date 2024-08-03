// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StreamsModule } from './steams/streams.module'; // Corrected import path
import { User } from './auth/user.entity';
import { Stream } from './steams/stream.entity'; // Corrected import path
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Database type
        host: configService.get<string>('DATABASE_HOST'), // Database host
        port: configService.get<number>('DATABASE_PORT'), // Database port
        username: configService.get<string>('DATABASE_USER'), // Database username
        password: configService.get<string>('DATABASE_PASSWORD'), // Database password
        database: configService.get<string>('DATABASE_NAME'), // Database name
        entities: [User, Stream], // Entities to be used
        synchronize: true, // Synchronize database schema with entities
      }),
      inject: [ConfigService], // Inject ConfigService to use environment variables
    }),
    AuthModule, // Authentication module
    StreamsModule, // Streams module
    ChatModule, // Chat module
  ],
  providers: [ChatGateway, ChatService], // Provide ChatGateway and ChatService
})
export class AppModule {}
