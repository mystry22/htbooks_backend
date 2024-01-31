import { IsAlpha, IsEmail, IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";

const  toYear: Date = new Date();
const nextYear: number  = toYear.getFullYear() +1;

export class UploadBooksDto{
     

    constructor(
        
     ){}

    @IsString()
    @IsNotEmpty()
    book_name: string;


    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1950)
    @Max(nextYear)
    release_year: number;

    @IsNotEmpty()
    author_id: string;

    @IsEmail()
    @IsNotEmpty()
    author_email: string;


}