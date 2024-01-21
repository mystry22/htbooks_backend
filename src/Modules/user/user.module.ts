import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { Users, userSchema } from 'src/common/schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: userSchema
    }])
  ],

  providers:[
    UserService
  ]
})
export class UserModule {}
