import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EventRepository } from './event.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            EventRepository
        ])
    ]
})
export class RepositoryModule {}

