import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})

export class Product extends Document {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    amount: number;

    @Prop()
    image_url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)