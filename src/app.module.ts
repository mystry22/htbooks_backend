import { Module } from '@nestjs/common';
import { UserModule } from './Modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AdminModule } from './Modules/admin/admin.module';

@Module({
  imports: [UserModule,
    AdminModule,
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGODB_DB_CONNECTION)
],
  providers: [],
})
export class AppModule {}
