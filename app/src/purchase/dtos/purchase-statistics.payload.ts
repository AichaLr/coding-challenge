import { TopSellingProduct } from './top-selling-product.payload';

export class PurchaseStatisticsPayload {
  topSellingProducts: TopSellingProduct[];
  totalPurchases: number;
}
