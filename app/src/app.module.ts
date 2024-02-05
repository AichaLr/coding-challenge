import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ProductModule,
    PurchaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
