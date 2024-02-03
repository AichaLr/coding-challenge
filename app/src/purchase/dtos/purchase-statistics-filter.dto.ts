import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PurchaseStatisticsFilterDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  topSelling: number;
}
