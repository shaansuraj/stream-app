import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Inject User repository
    private jwtService: JwtService, // Inject JwtService for JWT operations
    private usersService: UsersService // Inject UsersService for user-related operations
  ) {}

  /**
   * Signup a new user
   * @param name - User's name
   * @param email - User's email
   * @param password - User's password
   * @returns a JWT token
   */
  async signup(name: string, email: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = this.userRepository.create({ name, email, password: hashedPassword }); // Create a new user entity
    await this.userRepository.save(user); // Save the user to the database
    return this.jwtService.sign({ userId: user.id }); // Return a signed JWT token
  }

  /**
   * Login a user
   * @param email - User's email
   * @param password - User's password
   * @returns a JWT token
   * @throws Error if credentials are invalid
   */
  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } }); // Find the user by email
    if (user && (await bcrypt.compare(password, user.password))) { // Validate the password
      return this.jwtService.sign({ userId: user.id }); // Return a signed JWT token
    }
    throw new Error('Invalid credentials'); // Throw an error if credentials are invalid
  }

  /**
   * Validate a user by userId
   * @param userId - User's ID
   * @returns the user object if found, otherwise null
   */
  async validateUser(userId: number): Promise<any> {
    const user = await this.usersService.findOneById(userId); // Find the user by ID using UsersService
    if (user) {
      return user; // Return the user object if found
    }
    return null; // Return null if user is not found
  }
}
