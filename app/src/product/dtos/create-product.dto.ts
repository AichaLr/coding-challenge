import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Category } from '../enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '@app/common/constants/error-messages';

export class CreateProductDto {
  @IsString({
    message: ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.INVALID_PRODUCT_NAME,
  })
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsString({
    message:
      ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.INVALID_PRODUCT_DESCRIPTION,
  })
  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  quantity: number;

  @IsBoolean()
  @Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  )
  @ApiPropertyOptional()
  @IsOptional()
  isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsEnum(Category, {
    message: ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.INVALID_CATEGORY,
  })
  @IsOptional()
  category?: Category;
}
