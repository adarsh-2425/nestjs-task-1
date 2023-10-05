import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CartService } from './cart.service';
import { log } from 'console';

@Controller('api/cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Post()
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    create(@Request() req, @Body() productDetails) {
        const user_id = req.user._id;
        return this.cartService.create(user_id, productDetails)
    }

    @Get('mycart')
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    viewCart(@Request() req) {
        const user_id = req.user._id;
        return this.cartService.viewCart(user_id);
    }

    @Put(':id')
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    update(@Param('id')cart_id, @Body() updateData):any {
        return this.cartService.updateCart(cart_id, updateData)
    }

    @Delete(':id')
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    delete(@Param('id') id, @Body() body) {
        return this.cartService.deleteCart(id, body);
    }

}
