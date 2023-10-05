import { Controller, Get, Param, Request, UseGuards, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CartService } from 'src/cart/cart.service';
import { CheckoutService } from './checkout.service';
import { stripeWebhook } from 'src/stripe/stripe.webhook.controller';

@Controller('api/checkout')
export class CheckoutController {
    constructor(
        private readonly cartService: CartService,
        private readonly checkoutService: CheckoutService,
    ){}

    @Get(':id')
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    checkout(@Request() req, @Param('id') id) {
        const current_user_id = req.user._id;
        return this.checkoutService.checkout(current_user_id, id)
    }

    @Post('webhook')
    webhook(@Req() req) {
        const event = req.body;
        return this.checkoutService.paymentSuccess(event);     
    }

    @Get('order/history')
    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    orderHistory(@Request() req) {
        const current_user_id = req.user._id;
        return this.checkoutService.orderHistory(current_user_id)
    }

}

