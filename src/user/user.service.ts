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
    async login(user: LoginDto): Promise<string> {
        const isUser = this.userModel.findOne({email: user.email});

        // Email is wrong or user does not exist
        if (!isUser) {
            throw new HttpException(
                'User Not Found. Please Check Your Credentials or Create an Account',
                HttpStatus.BAD_REQUEST
            )
        }

        // decrypt the password
        const isPassword = await bcrypt.compare(user.password, (await isUser).password);

        // if password is wrong
        if (!isPassword) {
            throw new HttpException(
                'Password is wrong',
                HttpStatus.BAD_REQUEST
            )
        }

        return 'login success';
    }
}
