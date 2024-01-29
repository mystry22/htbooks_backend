import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';

@Module({
  providers: [AdminService],
  imports: [],
  controllers: [AdminController]
})
export class AdminModule {}
