import { ERROR_MESSAGES } from '@app/common/constants/error-messages';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.EMAIL_REQUIRED,
  })
  email: string;

  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.PASSWORD_REQUIRED,
  })
  @IsString()
  password: string;
}
