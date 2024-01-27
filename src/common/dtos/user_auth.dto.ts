import { IsEmail, IsNotEmpty,IsString,MinLength } from "class-validator";

export class UserLogindto{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}