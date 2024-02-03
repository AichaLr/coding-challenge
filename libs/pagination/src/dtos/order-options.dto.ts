import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Order } from '../enum/order.enum';

export class OrderOptionsDto {
  @ApiPropertyOptional({ enum: Order })
  @IsEnum(Order, {
    message: 'INVALID_ORDER',
  })
  @IsOptional()
  readonly createdAt?: Order;

  @ApiPropertyOptional({ enum: Order })
  @IsEnum(Order, {
    message: 'INVALID_ORDER',
  })
  @IsOptional()
  readonly id?: Order;

  @ApiPropertyOptional({ enum: Order })
  @IsEnum(Order, { message: 'INVALID_ORDER' })
  @IsOptional()
  readonly price?: Order;
}
