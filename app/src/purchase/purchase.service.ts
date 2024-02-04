import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from '../purchase/schemas/purchase.schema';
import { UserService } from '@app/user';
import { TopSellingProduct } from './dtos/top-selling-product.payload';
import { PurchaseStatisticsFilterDto } from './dtos';
import { LoggerService } from '@app/common/logger/logger.service';
import { CreditCard } from '@app/external-api/interfaces';
import { ExternalApiService } from '@app/external-api';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private readonly externalApiService: ExternalApiService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  //TODO add typing response and verify responses for all functions also in the controller
  async purchaseStatistics(
    purchaseStatisticsFilterDto: PurchaseStatisticsFilterDto,
    userId: string,
  ) {
    const { topSelling } = purchaseStatisticsFilterDto;
    const topSellingProducts = await this.findTopSellingProducts(topSelling);
    const totalPurchases = await this.calculateTotalPurchases(userId);
    this.logger.log('PurchaseService', 'Fetching Purchase Statistics');
    return {
      topSellingProducts,
      totalPurchases,
    };
  }

  async findTopSellingProducts(limit: number): Promise<TopSellingProduct[]> {
    const topSellingProducts = await this.purchaseModel.aggregate([
      {
        $group: {
          _id: '$product._id',
          name: { $first: { $ifNull: ['$product.name', ''] } },
          price: { $first: { $ifNull: ['$product.price', 0] } },
          category: { $first: { $ifNull: ['$product.category', ''] } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
    ]);
    return topSellingProducts;
  }

  async calculateTotalPurchases(userId: string): Promise<number> {
    const user = await this.userService.getOneById(userId);
    const where = { purchasedBy: user };
    const totalPurchases = await this.purchaseModel.countDocuments(where);
    return totalPurchases;
  }

  async getCreditCards(limit: number): Promise<CreditCard[]> {
    this.logger.log('PurchaseService', `Fetching Credit Card List`);
    return await this.externalApiService.getCreditCards(limit);
  }
}
