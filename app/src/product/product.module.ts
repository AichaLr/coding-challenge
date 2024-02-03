import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductController } from './product.controller';
import { AuthModule } from '@app/auth';
import { LoggerModule } from '@app/common/logger/logger.module';
import { Purchase, PurchaseSchema } from '../purchase/schemas/purchase.schema';
import { UserModule } from '@app/user';
import { ExternalApiModule } from '@app/external-api';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Purchase.name,
        schema: PurchaseSchema,
      },
    ]),
    AuthModule,
    LoggerModule,
    UserModule,
    ExternalApiModule,
  ],
  exports: [ProductService],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
