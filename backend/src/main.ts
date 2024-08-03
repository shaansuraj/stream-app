// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';

dotenv.config(); // Load environment variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create a NestJS application instance

  // Enable CORS with specific configuration
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow credentials
  });

  app.useWebSocketAdapter(new IoAdapter(app)); // Use IoAdapter for WebSocket support

  await app.listen(3000); // Start the application on port 3000
}

bootstrap(); // Initialize the application
