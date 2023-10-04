import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    signup(@Body() signupdto: SignUpDto) {
        return this.authService.signup(signupdto)
    }

    @Post('login')
    login(@Body() logindto: LoginDto) {
        return this.authService.login(logindto);
    }
}
