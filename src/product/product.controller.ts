import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './interface/product.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('api/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    // Get all Products route
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }
    
    // Update product

    @Put(':id')
    //@UseGuards(JwtAuthGuard)
    updateProduct(@Body() product: UpdateProductDto, @Param('id') id: string): any{
        console.log(product)
        return this.productService.updateProduct(id, product)
    }

    // create product
    @Post()
    createProduct(@Body() productdto: ProductDto) {
        return this.productService.createProduct(productdto)
    }
}
