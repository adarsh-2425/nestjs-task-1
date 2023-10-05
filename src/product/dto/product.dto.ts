import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class ProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;


    image_url: string;
}