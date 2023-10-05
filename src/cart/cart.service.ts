import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './interface/cart.interface';
import { Model } from 'mongoose';
import { Product } from 'src/product/interface/product.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>){}

    async create(id: string, productDetails: any): Promise<any> {

          const newCart = new this.cartModel({
            user_id: id,
            items: productDetails.items
          });

        await newCart.save();

        return newCart;
      }

    async viewCart(id: string): Promise<any> {
        const items = await this.cartModel.find({user_id: id});
        return items;
    }

    async updateCart(cartId: string, updateData: any): Promise<any> {

      const cart = await this.cartModel.findById(cartId);

      const { itemIndex, newCount }= updateData;

      // Ensure that itemIndex is within the bounds of the items array
      if (itemIndex < 0 || itemIndex >= cart.items.length) {
        throw new Error('Invalid item index');
      }

      // Update the count of the specified item
      cart.items[itemIndex].count = newCount;

      // Save the updated cart
      const updatedCart = await cart.save();

      return updatedCart;

    }

    async deleteCart(cartId: string, itemIndex: number)  {

      const cart = await this.cartModel.findById(cartId);

    if (!cart) {
      console.log(`Cart with ID ${cartId} not found.`);
      return;
    }

    if (itemIndex < 0 || itemIndex >= cart.items.length) {
      console.log(`Invalid item index ${itemIndex}.`);
      return;
    }

    // Remove the item at the specified index
    cart.items.splice(itemIndex, 1);

    const result = await cart.save();

    return cart;

      
    }

}
