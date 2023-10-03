import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6) // minimum length 6
    password: string;
}