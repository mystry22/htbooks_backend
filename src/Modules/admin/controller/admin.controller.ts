import { Controller, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {

    @Post('signup')
    async createadmin(){
        return 'Hello'
    }
}
