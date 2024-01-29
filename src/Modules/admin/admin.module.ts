import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admins, adminSchema } from 'src/common/schema/admin.schema';

@Module({
  providers: [AdminService],
  imports: [
    MongooseModule.forFeature([{
      name: Admins.name,
      schema: adminSchema
    }]),
  ],
  controllers: [AdminController]
})
export class AdminModule {}
