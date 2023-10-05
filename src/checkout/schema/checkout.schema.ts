import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})

export class Checkout extends Document {
    @Prop({ required: true })
    userId: string;
  
    @Prop({ required: true })
    cartId: string;
  
    @Prop({ required: true })
    totalAmount: number;
  
    @Prop({ default: false })
    paymentSuccess: boolean;
  
  }

  export const CheckoutSchema = SchemaFactory.createForClass(Checkout);