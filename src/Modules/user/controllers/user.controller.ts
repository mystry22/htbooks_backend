import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/createuser.dto';
import { UserService } from '../services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){ }

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
                return {message : 'user created successfully', user: reqBody}
            }
        }else{
            throw new HttpException('User already exists',HttpStatus.BAD_REQUEST);
        }
       
    }
}
