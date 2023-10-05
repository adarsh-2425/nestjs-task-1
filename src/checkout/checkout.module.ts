import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchmea } from 'src/cart/schema/cart.schema';
import { CheckoutSchema } from './schema/checkout.schema';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Checkout', schema: CheckoutSchema },
    { name: 'Cart', schema: CartSchmea }
  ])],
  controllers: [CheckoutController],
  providers: [CheckoutService, CartService]
})
export class CheckoutModule {}
