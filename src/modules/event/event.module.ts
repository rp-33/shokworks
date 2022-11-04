import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from 'src/repositories/event.repository';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      EventRepository
    ])
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
