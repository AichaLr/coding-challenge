import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '@app/auth';
import { LoginRequestDto } from '@app/user/dtos/login-request.dto';
import { RegisterRequestDto } from '@app/user/dtos';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@app/user/enums';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly roles: RoleEnum[] = [RoleEnum.ADMIN, RoleEnum.USER];

  constructor(private authService: AuthService) {}

  @Post('signup')
  register(@Body() registerRequestDto: RegisterRequestDto) {
    console.log(registerRequestDto);
    return this.authService.signUp(registerRequestDto);
  }

  @Post('signin')
  login(@Body() loginRequestDto: LoginRequestDto) {
    console.log(loginRequestDto);
    return this.authService.signIn(loginRequestDto, this.roles);
  }
  //TODO: Add ,Update Get Profile
}
