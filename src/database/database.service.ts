import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    async useFactory() {
      return {
        type: 'postgres' as 'postgres',
        url: process.env.ENVIRONMENT === 'develop' ? process.env.DATABASE_URL_DEVELOP : process.env.DATABASE_URL,
        ssl: process.env.ENVIRONMENT === 'develop' ? null : { rejectUnauthorized: false},
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];