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
import { Roles } from '@app/auth/decorators';
import { RoleEnum } from '@app/user/enums';
import { RolesGuard } from '@app/auth/guards/role.guard';

@Controller('purchase')
@ApiTags('purchase')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.USER)
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Get('/stats')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Purchase Statistics Fetched' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async purchaseStatistics(
    @Query() purchaseStatisticsFilterDto: PurchaseStatisticsFilterDto,
    @Request() req: IRequestWithUser,
  ) {
    const userId = req.user.sub;
    return await this.purchaseService.purchaseStatistics(
      purchaseStatisticsFilterDto,
      userId,
    );
  }

  @Get('cards')
  async getCreditCards(@Query('limit') limit: string) {
    return await this.purchaseService.getCreditCards(+limit);
  }
}
