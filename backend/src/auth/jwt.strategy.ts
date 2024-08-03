import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService, // Inject AuthService
    private configService: ConfigService, // Inject ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false, // Do not ignore token expiration
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get JWT secret from configuration
    });
  }

  /**
   * Validate the JWT payload
   * @param payload - The JWT payload containing the userId
   * @returns the user object if validation is successful
   */
  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.userId); // Validate the user based on the payload
    return { id: user.id, name: user.name, email: user.email }; // Return essential user information
  }
}
