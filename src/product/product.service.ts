import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
    constructor(@InjectModel('User') private readonly userModel: Model<Product>){}

    
}
