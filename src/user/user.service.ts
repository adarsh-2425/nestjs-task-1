import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignUp } from './interface/signup.interface';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<SignUp>){}

    // SignUp
    async signup(user: SignUpDto): Promise<SignUp> {
        
        const newUser = new this.userModel(user);

        // check if user exists
        const userExists = await this.userModel.findOne({email: newUser.email}); 

        //custome validation mesage for email already exists
        if (userExists) {
            throw new HttpException(
              'Email already exists. Please log in to your account.',
              HttpStatus.BAD_REQUEST,
            );
          }

        // Hash the password
        newUser.password = await bcrypt.hash(newUser.password, 10);

        return await newUser.save();
    }

    // Login
    async login(user: LoginDto) {
        const isUser = this.userModel.findOne({email: user.email});

        if (!isUser) {

        }
    }
}
