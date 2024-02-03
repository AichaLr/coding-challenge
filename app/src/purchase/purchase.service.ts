import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from '../purchase/schemas/purchase.schema';
import { UserService } from '@app/user';
import { ProductService } from '../product/product.service';
import { TopSellingProduct } from './dtos/top-selling-product.payload';
import { PurchaseStatisticsFilterDto } from './dtos';
import { LoggerService } from '@app/common/logger/logger.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  async purchaseStatistics(
    purchaseStatisticsFilterDto: PurchaseStatisticsFilterDto,
    userId: string,
  ) {
    const { topSelling } = purchaseStatisticsFilterDto;
    const topSellingProducts = await this.findTopSellingProducts(topSelling);
    //const trendingProducts = await this.getTrendingProducts();
    const totalPurchases = await this.calculateTotalPurchases(userId);
    this.logger.log('PurchaseService', 'Fetching Purchase Statistics');
    return {
      topSellingProducts,
      //trendingProducts,
      totalPurchases,
    };
  }

  async findTopSellingProducts(limit: number): Promise<TopSellingProduct[]> {
    const topSellingProducts = await this.purchaseModel.aggregate([
      {
        $group: {
          _id: '$product',
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

    const result: TopSellingProduct[] = [];

    for await (const productInfo of topSellingProducts) {
      const productId = productInfo._id;
      const product = await this.productService.getProductById(productId);
      result.push({
        name: product.name,
        id: product._id.toString(),
        purchaseCount: productInfo.count,
      });
    }

    return result;
  }

  async calculateTotalPurchases(userId: string): Promise<number> {
    const user = await this.userService.getOneById(userId);
    const where = { user };
    const totalPurchases = await this.purchaseModel.countDocuments(where);
    return totalPurchases;
  }
}
