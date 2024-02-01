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
        uri: configService.get<string>('DATABASE'),
      }),
    }),
  ],
})
export class DatabaseModule {}
