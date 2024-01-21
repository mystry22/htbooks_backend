import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/common/schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/common/dtos/createuser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(Users.name) private userModel : Model<Users> 
    ){ }

    // Create new user
    async saveNewUser(reqBody:CreateUserDto): Promise <string>{
        try{
        const response = await this.userModel.create(reqBody);
        if(response){
            return 'user created successfully';
        }
        }catch(err)
        {
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    // Check if user exists
    async checkUser(email:string){
        const user = await this.userModel.findOne({"email": email});
        if(user){
            return user;
        }else{
            return 'No user found'
        }

    }
}
