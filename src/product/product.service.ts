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
    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    // View One Product by id
    async getProduct(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    // Create a Product
    async createProduct(product: ProductDto): Promise<Product> {
        const newProduct = new this.productModel(product);

        return await newProduct.save();
    }

    // Update a Product by Id
    //not working. fix it. returning empty object
    async updateProduct(id: string, product: UpdateProductDto): Promise<any> {
      
        
      }
      

    // Delete a Product by Id

    
}
