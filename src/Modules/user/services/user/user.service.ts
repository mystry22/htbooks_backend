import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/common/schema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/common/dtos/createuser.dto';
import { Bcrypthelper } from 'src/Utilities/bcrypthelper';
import { UserLogindto } from 'src/common/dtos/user_auth.dto';
import * as bcrypt from 'bcrypt';







@Injectable()
export class UserService {

    constructor(
        @InjectModel(Users.name) private userModel : Model<Users>,
    ){  }

    // Create new user
    async saveNewUser(reqBody:CreateUserDto): Promise <string>{
        try{
            
            
        const isCreated = await this.userModel.create(reqBody);
        if(isCreated){
            const hashedPassword = await Bcrypthelper.encryptyPassword(reqBody.password);
            const updatePass = await this.updateUser(reqBody.email,hashedPassword);
            if(updatePass == 'password updated'){
                return 'user created successfully';
            }else{
                return 'user not updated';
            }
            
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

    //login users
    async login(reqbody:UserLogindto){
        const user = await this.userModel.findOne({"email":reqbody.email});
        if(user && (await bcrypt.compare(reqbody.password,user.uniqueKey))){
            return user;
        }else throw new HttpException('invalid user details', HttpStatus.BAD_REQUEST)

    }

    //update password function
    async updateUser(email:string,hashedPass:string){
        const isUpdated = await this.userModel.updateOne({email : email}, {$set : {uniqueKey: hashedPass}})
        if(isUpdated){
         return 'password updated'
        }
     }

    
}
