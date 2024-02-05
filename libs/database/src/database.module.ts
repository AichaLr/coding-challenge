import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'libs/config/src';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('DATABASE_USER')}:${configService.get<string>('DATABASE_PASS')}@mongodb:27017/${configService.get<string>('DATABASE_NAME')}?authSource=admin`,
      }),
    }),
  ],
})
export class DatabaseModule {}
