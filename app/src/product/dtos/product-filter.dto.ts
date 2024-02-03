import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProductFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'INVALID_NAME' })
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({
    message: 'INVALID_IS_AVAILABLE_VALUE',
  })
  @Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  )
  readonly isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  minPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  maxPrice: number;
}
