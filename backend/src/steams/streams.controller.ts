import { Controller, Post, Body, Get, Param, UseGuards, Delete, Req } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { Stream } from './stream.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('streams')
export class StreamsController {
  constructor(private streamsService: StreamsService) {}

  /**
   * Create a new stream
   * @param title - Title of the stream
   * @param description - Description of the stream
   * @param req - Request object containing the authenticated user
   * @returns the created stream
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createStream(
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req
  ): Promise<Stream> {
    const user = req.user; // Get the authenticated user
    return this.streamsService.createStream(title, description, user);
  }

  /**
   * Get all streams
   * @returns an array of all streams
   */
  @Get()
  async getStreams(): Promise<Stream[]> {
    return this.streamsService.getStreams();
  }

  /**
   * Get streams created by the authenticated user
   * @param req - Request object containing the authenticated user
   * @returns an array of streams created by the user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  async getUserStreams(@Req() req): Promise<Stream[]> {
    const user = req.user; // Get the authenticated user
    return this.streamsService.getUserStreams(user);
  }

  /**
   * Get a stream by its ID
   * @param id - ID of the stream
   * @returns the stream with the specified ID
   */
  @Get(':id')
  async getStreamById(@Param('id') id: number): Promise<Stream> {
    return this.streamsService.getStreamById(id);
  }

  /**
   * Delete a stream by its ID
   * @param id - ID of the stream
   * @returns void
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteStream(@Param('id') id: number): Promise<void> {
    return this.streamsService.deleteStream(id);
  }

  /**
   * Get the count of streams created by a specific user
   * @param userId - ID of the user
   * @returns an object containing the count of streams
   */
  @Get('user/:userId/count')
  async getStreamsCountByUser(@Param('userId') userId: number): Promise<{ count: number }> {
    const count = await this.streamsService.getStreamsCountByUser(userId);
    return { count };
  }
}
