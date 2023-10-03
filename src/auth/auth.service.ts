import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ){}

    async signup(signupdto) {
        return this.userService.signup(signupdto)
    }
}
