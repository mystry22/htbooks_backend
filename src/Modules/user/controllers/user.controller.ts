import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/createuser.dto';
import { UserService } from '../services/user/user.service';
import { Signtoken } from 'src/Utilities/signToken';
import { UserLogindto } from 'src/common/dtos/user_auth.dto';
const tokenService = new Signtoken();

@Controller('user')
export class UserController {

    constructor(private userService: UserService
        ){ }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() reqBody : CreateUserDto){
        //check if user exists
        const email = reqBody.email;
        const isExist = await this.userService.checkUser(email);
        if(isExist == 'No user found'){

            //register the new user
            const response : string =  await this.userService.saveNewUser(reqBody);
            if(response == 'user created successfully'){
                const payload = {email:reqBody.email};
                const token = tokenService.signUserToken(payload);
                return {message: 'User created successfully', token:token};
            }
        }else{
            throw new HttpException('User already exists',HttpStatus.BAD_REQUEST);
        }
       
    }

    @Post('auth')
    @UsePipes(new ValidationPipe())
    async authuser(@Body() reqBody: UserLogindto){

        const isUser = await this.userService.login(reqBody);
        if(isUser){
            const payload = {email: reqBody.email};
            const token =  tokenService.signUserToken(payload);
            return {message: 'User authenticated successfully', token}
        }
        


        
    }
}
