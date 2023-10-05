import { Body, Controller, Delete, Get, Param, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './interface/product.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../multer/multer.config'

@Controller('api/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
    
    // admin protected route testing
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('/test/1')
    protectedAdminRoute(@Request() req) { // @Request() req is for accessing request body
        console.log(req.user)
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
    @Post()
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    createProduct(@UploadedFile() file:any, @Body() productdto: ProductDto) {
        return this.productService.createProduct(productdto, file)
    }

    // Update a Product
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    @Put(':id')
    updateProduct(@UploadedFile() file:any, @Body() productdto: Product, @Param('id') id):Promise<Product> {
        return this.productService.updateProduct(id, productdto, file)
    }

    // Delete a Product
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}
