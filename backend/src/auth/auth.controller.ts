import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

// AuthController handles authentication-related routes
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Signup endpoint to register a new user
   * @param name - User's name
   * @param email - User's email
   * @param password - User's password
   * @returns a JWT token and user details
   */
  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ token: string; user: any }> {
    const token = await this.authService.signup(name, email, password);
    return { token, user: { name, email } };
  }

  /**
   * Login endpoint to authenticate a user
   * @param email - User's email
   * @param password - User's password
   * @returns a JWT token and user details
   */
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ token: string; user: any }> {
    const token = await this.authService.login(email, password);
    return { token, user: { email } };
  }

  /**
   * Get current user details
   * This endpoint is protected and requires a valid JWT token
   * @param req - Request object containing user details
   * @returns the current authenticated user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}
