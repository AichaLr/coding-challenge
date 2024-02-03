import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as AppAuthModule } from '@app/auth';

@Module({
  imports: [AppAuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
