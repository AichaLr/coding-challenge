import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthModule } from './auth/auth.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://127.0.0.1/test_mongoose'),
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
