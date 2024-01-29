import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admins } from 'src/common/schema/admin.schema';
import { Model } from 'mongoose';
import { AdminDto } from 'src/common/dtos/createadmin.dto';
import { Bcrypthelper } from 'src/Utilities/bcrypthelper';
import { UserLogindto } from 'src/common/dtos/user_auth.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admins.name) private adminModel: Model<Admins>,

    ) { }

    //Check Admin
    async checkAdmin(email: string) {
        const user = await this.adminModel.findOne({ "email": email });
        if (user) {
            return user;
        } else {
            return 'No user found'
        }

    }

    // Create new admin
    async createNewAdmin(reqBody: AdminDto): Promise<string> {
        try {

            const isCreated = await this.adminModel.create(reqBody);
            if (isCreated) {
                const hashedPassword = await Bcrypthelper.encryptyPassword(reqBody.password);
                const updatePass = await this.updateUser(reqBody.email, hashedPassword);
                if (updatePass == 'password updated') {
                    return 'user created successfully';
                } else {
                    return 'user not updated';
                }

            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    //update password function
    async updateUser(email: string, hashedPass: string) {
        const isUpdated = await this.adminModel.updateOne({ email: email }, { $set: { uniqueKey: hashedPass } })
        if (isUpdated) {
            return 'password updated'
        }
    }

    //login admin
    async login(reqbody:UserLogindto){
        const user = await this.adminModel.findOne({"email":reqbody.email});
        if(user && (await bcrypt.compare(reqbody.password,user.uniqueKey))){
            return user;
        }else throw new HttpException('invalid user details', HttpStatus.BAD_REQUEST)

    }
}
