import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    
    // admin protected route testing
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('/test/1')
    protectedAdminRoute() {
        return 'Welcome Admin. You now have access to routes protected with role Admin'
    }

    // user protected route testing
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('test/2')
    protectedUserRoute() {
        return 'Welcome user. You now have access to routes protected with role user'
    }

    // admin or user protected route testing
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('/test/3')
    protectedRoute() {
        return 'Welcome. You now have access to routes protected with role either Admin or User'
    }
    
    // Get all Products route
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    getProducts() {
        return this.productService.getProducts();
    }

    // get one product
    @Get(':id')
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    getProductById(@Param('id')id): Promise<Product> {
        return this.productService.getProductById(id);
    }

    // create product
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    createProduct(@Body() productdto: ProductDto) {
        return this.productService.createProduct(productdto)
    }

    // Update a Product
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(':id')
    updateProduct(@Body() productdto: Product, @Param('id') id):Promise<Product> {
        return this.productService.updateProduct(id, productdto)
    }

    // Delete a Product
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}
