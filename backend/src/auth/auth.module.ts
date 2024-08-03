import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // Import necessary modules
  imports: [
    // TypeOrmModule for interacting with the User entity
    TypeOrmModule.forFeature([User]),
    
    // JwtModule for handling JWT authentication
    JwtModule.registerAsync({
      // Import ConfigModule for configuration management
      imports: [ConfigModule],
      // Use factory function to configure JwtModule with dynamic values
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get JWT secret from config
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }, // Get JWT expiration time from config
      }),
      inject: [ConfigService], // Inject ConfigService for accessing configuration values
    }),
    ConfigModule, // ConfigModule for environment configuration
  ],
  
  // Provide services to be used by other parts of the application
  providers: [UsersService, AuthService, JwtStrategy],
  
  // Define controllers for handling incoming requests
  controllers: [AuthController],
})
export class AuthModule {}
