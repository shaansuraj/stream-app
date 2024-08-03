import { Module } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamsController } from './streams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stream } from './stream.entity';

// StreamsModule to bundle StreamsService and StreamsController together
@Module({
  imports: [TypeOrmModule.forFeature([Stream])], // Import TypeOrmModule for Stream entity
  providers: [StreamsService], // Provide StreamsService to the module
  controllers: [StreamsController], // Register StreamsController
})
export class StreamsModule {}