import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './repositories/repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule, 
    RepositoryModule,
    AuthModule,
    EventModule
  ]
})

export class AppModule {
  static port : number | string;
  constructor(){
    AppModule.port = process.env.PORT || 8088;
  }
}
