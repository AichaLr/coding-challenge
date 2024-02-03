import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth';
import { ProductModule } from '../product/product.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './schemas/purchase.schema';
import { UserModule } from '@app/user';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Purchase.name,
        schema: PurchaseSchema,
      },
    ]),
    ProductModule,
    AuthModule,
    UserModule,
    LoggerModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
