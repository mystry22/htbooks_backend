import { Body, Controller, Post, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AdminDto } from 'src/common/dtos/createadmin.dto';
import { AdminService } from '../service/admin.service';
import { Signtoken } from 'src/Utilities/signToken';
import { UserLogindto } from 'src/common/dtos/user_auth.dto';
const tokenService = new Signtoken();

@Controller('admin')
export class AdminController {

    constructor(private adminService : AdminService){}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createadmin(@Body() reqBody : AdminDto){
        const user = await this.adminService.checkAdmin(reqBody.email);

        if(user == 'No user found'){
            const isSaved = await this.adminService.createNewAdmin(reqBody);
            
            if(isSaved == 'user created successfully'){
                const payload = {email:reqBody.email,role:reqBody.role};
                const token = tokenService.signUserToken(payload);
                return {message: 'Admin created successfully', token:token};

            }
        }

        throw new HttpException('User already exists',HttpStatus.BAD_REQUEST);
        
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() reqBody: UserLogindto){
        return 'holla'
    }
}
