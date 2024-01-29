import { IsNotEmpty, IsAlpha, IsString, IsEmail, MinLength } from "class-validator";

export class AdminDto{

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string

    @IsNotEmpty()
    @MinLength(6)
    uniqueKey: string;
}