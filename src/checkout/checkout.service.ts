import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Cart } from 'src/cart/interface/cart.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Checkout } from './interface/checkout.interface';
import { createPaymentLink } from 'src/stripe/stripe.paymentlink';

@Injectable()
export class CheckoutService {
    constructor(
        @InjectModel('Cart') private readonly cartModel: Model<Cart>,
        @InjectModel('Checkout') private readonly checkoutModel: Model<Checkout>
    ){}

    
      async checkout(current_user_id: string, cartId: string)  {

        const cart = await this.cartModel
          .findOne({ _id: cartId })
          .populate('items.product_id', 'name amount');
    
        if (!cart) {
          throw new Error(`Cart with ID ${cartId} not found.`);
        }
  
  
        // Check if cart is not found
        if (!cart) {
          throw new NotFoundException(`Cart with ID ${cartId} not found.`);
        }
  
        // Fetch the cart and check user permission
        if (cart.user_id.toString() !== current_user_id.toString()) {
          throw new ForbiddenException('You don\'t have permission to access this cart');
        }
    
        // Calculate the total amount by summing up the amounts of all items
        const totalAmount = cart.items.reduce((sum, item) => {
          return sum + item.product_id.amount;
        }, 0);
  
        //Stripe payment link
        const paymentLink = await createPaymentLink(current_user_id, totalAmount)

        const newCheckout = new this.checkoutModel({
            userId: current_user_id,
            cartId: cartId,
            totalAmount,
            paymentLink
        })

        await newCheckout.save();

        return newCheckout;

      }

}
