import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class Product {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    price: number;

    @IsNotEmpty()
    @IsString()
    image_url: string;
}