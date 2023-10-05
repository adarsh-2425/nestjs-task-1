import { IsString, IsNotEmpty } from "class-validator";

export class CartDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    items: any[];
}