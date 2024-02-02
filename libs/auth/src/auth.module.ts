import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@app/user';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@app/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_AUTH_KEY'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
