import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  HttpCode,
} from '@nestjs/common';

import { AccessTokenGuard } from '@app/auth/guards';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseService } from './purchase.service';
import { IRequestWithUser } from '@app/common/interfaces/request-user.interface';
import { PurchaseStatisticsFilterDto } from './dtos';

@Controller('purchase')
@ApiTags('purchase')
@UseGuards(AccessTokenGuard)
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Get('/stats')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Purchase Statistics Fetched' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  purchaseStatistics(
    @Query() purchaseStatisticsFilterDto: PurchaseStatisticsFilterDto,
    @Request() req: IRequestWithUser,
  ) {
    const userId = req.user.sub;
    return this.purchaseService.purchaseStatistics(
      purchaseStatisticsFilterDto,
      userId,
    );
  }
}
