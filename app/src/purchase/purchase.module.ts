import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './schemas/purchase.schema';
import { UserModule } from '@app/user';
import { LoggerModule } from '@app/common';
import { ExternalApiModule } from '@app/external-api';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Purchase.name,
        schema: PurchaseSchema,
      },
    ]),
    AuthModule,
    UserModule,
    LoggerModule,
    ExternalApiModule,
  ],
  providers: [PurchaseService],
  exports: [PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
