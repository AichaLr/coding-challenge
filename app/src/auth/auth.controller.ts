import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '@app/auth';
import { LoginRequestDto } from '@app/user/dtos/login-request.dto';
import { RegisterRequestDto } from '@app/user/dtos';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authService.signUp(registerRequestDto);
  }

  @Post('signin')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.signIn(loginRequestDto);
  }
}
