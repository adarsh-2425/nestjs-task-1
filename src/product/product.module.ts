import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]), UserModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}