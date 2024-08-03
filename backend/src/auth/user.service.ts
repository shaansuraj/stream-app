import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inject User repository
  ) {}

  /**
   * Find a user by their ID
   * @param id - User's ID
   * @returns the user object if found
   */
  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } }); // Find user by ID
  }
}
