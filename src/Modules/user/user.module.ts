import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { Users, userSchema } from 'src/common/schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: userSchema
    }]),
    ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions:{
                expiresIn:process.env.JWT_EXPIRES
            }
        })
  ],

  providers:[
    UserService
  ]
})
export class UserModule {}
