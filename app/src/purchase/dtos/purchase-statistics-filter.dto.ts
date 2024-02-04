import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PurchaseStatisticsFilterDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  topSelling: number;
}
