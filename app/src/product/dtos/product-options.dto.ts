import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ProductFilterDto } from '.';
import { OrderOptionsDto, PageOptionsDto } from '@app/pagination/dtos';

export class ProductOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => ProductFilterDto)
  @ValidateNested({ each: true })
  query: ProductFilterDto;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => OrderOptionsDto)
  @ValidateNested({ each: true })
  readonly sort?: OrderOptionsDto;
}
