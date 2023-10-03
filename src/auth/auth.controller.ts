import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signup(@Body() signupdto: SignUpDto) {
        return this.authService.signup(signupdto)
    }
}
