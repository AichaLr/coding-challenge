import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ConfigModule } from '@app/config';
import { LoggerModule } from '@app/common';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
