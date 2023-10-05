import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interface/product.interface';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    // View all products
    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    // View One Product by id
    async getProductById(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    // Create a Product
    async createProduct(product: ProductDto, file:any): Promise<Product> {
        const { name, description, amount } = product;
        const newProduct = new this.productModel({
            name,
            description,
            amount,
            image_url: file.originalname
        });

        return await newProduct.save();
    }

    // Update a Product by Id
    async updateProduct(id: String, product: Product): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true })
      }

    // Delete a Product by Id
    async deleteProduct(id: String): Promise<Product> {
        return this.productModel.findByIdAndDelete(id)
      }

    
}
