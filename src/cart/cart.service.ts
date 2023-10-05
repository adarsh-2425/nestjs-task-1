import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './interface/cart.interface';
import { Model } from 'mongoose';
import { ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CartDto } from './dtos/cart.dto';
import { UpdateCart } from './interface/updatecart.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>){}

    async create(id: string, productDetails: CartDto): Promise<Cart> {

          const newCart = new this.cartModel({
            user_id: id,
            items: productDetails.items
          });

        await newCart.save();

        // Iterate through each item and populate its product_id field
    for (const item of newCart.items) {
      await this.cartModel.populate(item, { path: 'product_id', select: 'name amount' });
    }

        return newCart;
      }

    async viewCart(id: string): Promise<Cart[]> {
        return await this.cartModel.find({user_id: id});
    }

    async updateCart(curent_user_id: string, cartId: string, updateData: UpdateCart): Promise<any> {

      const cart = await this.cartModel.findById(cartId);

      // Check if cart is not found
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found.`);
    }

      // Fetch the cart and check user permission
      if (cart.user_id.toString() !== curent_user_id.toString()) {
        throw new ForbiddenException('You don\'t have permission to access this cart');
      } 

      const { itemIndex, newCount }= updateData;

      // Ensure that itemIndex is within the bounds of the items array
      if (itemIndex < 0 || itemIndex >= cart.items.length) {
        throw new HttpException('Invalid item index', HttpStatus.BAD_REQUEST);
      }

      // Update the count of the specified item
      cart.items[itemIndex].count = newCount;

      // Save the updated cart
      const updatedCart = await cart.save();

      return updatedCart;

    }

    async deleteCart(current_user_id: string, cartId: string, itemIndex: number)  {

      const cart = await this.cartModel.findById(cartId);

      // Check if cart is not found
      if (!cart) {
        throw new NotFoundException(`Cart with ID ${cartId} not found.`);
      }

      // Fetch the cart and check user permission
      if (cart.user_id.toString() !== current_user_id.toString()) {
        throw new ForbiddenException('You don\'t have permission to access this cart');
      }

    if (itemIndex < 0 || itemIndex >= cart.items.length) {
      throw new HttpException('Invalid item index', HttpStatus.BAD_REQUEST);
    }

    // Remove the item at the specified index
    cart.items.splice(itemIndex, 1);

    const result = await cart.save();

    return cart;

      
    }

    // Calculate total amount
    async calculateTotalAmount(current_user_id: string, cartId: string): Promise<number> {
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
  
      return totalAmount;
    }

}
