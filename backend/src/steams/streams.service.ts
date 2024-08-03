import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from './stream.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(Stream)
    private streamRepository: Repository<Stream>, // Inject Stream repository
  ) {}

  /**
   * Create a new stream
   * @param title - Title of the stream
   * @param description - Description of the stream
   * @param user - User creating the stream
   * @returns the created stream
   */
  async createStream(title: string, description: string, user: User): Promise<Stream> {
    console.log('Creating stream with title:', title, 'description:', description, 'user:', user);
    const stream = this.streamRepository.create({ title, description, user });
    return await this.streamRepository.save(stream);
  }

  /**
   * Get all streams
   * @returns an array of all streams with their user relations
   */
  async getStreams(): Promise<Stream[]> {
    return await this.streamRepository.find({ relations: ['user'] });
  }

  /**
   * Get a stream by its ID
   * @param id - ID of the stream
   * @returns the stream with the specified ID
   */
  async getStreamById(id: number): Promise<Stream> {
    return await this.streamRepository.findOne({ where: { id }, relations: ['user'] });
  }

  /**
   * Get streams created by a specific user
   * @param user - User whose streams are to be fetched
   * @returns an array of streams created by the user
   */
  async getUserStreams(user: User): Promise<Stream[]> {
    return await this.streamRepository.find({ where: { user }, relations: ['user'] });
  }

  /**
   * Delete a stream by its ID
   * @param id - ID of the stream to be deleted
   * @returns void
   */
  async deleteStream(id: number): Promise<void> {
    await this.streamRepository.delete(id);
  }

  /**
   * Get the count of streams created by a specific user
   * @param userId - ID of the user
   * @returns the count of streams created by the user
   */
  async getStreamsCountByUser(userId: number): Promise<number> {
    return await this.streamRepository.count({ where: { user: { id: userId } } });
  }
}
