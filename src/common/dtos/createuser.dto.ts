import { Type } from "class-transformer";
import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";


export class CreateUserDto{

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    first_name : string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    last_name : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone : string;

    @IsString()
    isLicensed : string;
    
    @IsString()
    isEnabled: string;

    @IsString()
    @IsNotEmpty()
    uuid_code : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;

}