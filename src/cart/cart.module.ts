import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchmea } from './schema/cart.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchmea }
    ])
  ],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
