import { Body, Controller, Post, UsePipes, ValidationPipe, HttpException, HttpStatus, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AdminDto } from 'src/common/dtos/createadmin.dto';
import { AdminService } from '../service/admin.service';
import { Signtoken } from 'src/Utilities/signToken';
import { UserLogindto } from 'src/common/dtos/user_auth.dto';
import { Adminguard } from 'src/common/guards/admin.guard';
import { UploadBooksDto } from 'src/common/dtos/upload_book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../service/upload.service';
import { BUCKET_NAME,AWS_S3_REGION } from 'src/common/config/env.config';

const tokenService = new Signtoken();

@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService,
        private uploadService: UploadService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createadmin(@Body() reqBody: AdminDto) {
        const user = await this.adminService.checkAdmin(reqBody.email);

        if (user == 'No user found') {
            const isSaved = await this.adminService.createNewAdmin(reqBody);

            if (isSaved == 'user created successfully') {
                const payload = { email: reqBody.email, role: reqBody.role };
                const token = tokenService.signUserToken(payload);
                return { message: 'Admin created successfully', token: token };

            }
        }

        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() reqBody: UserLogindto) {
        const isUser = await this.adminService.login(reqBody);
        if (isUser) {
            const payload = { email: reqBody.email };
            const token = tokenService.signUserToken(payload);
            return { message: 'User authenticated successfully', token }
        }
    }

    //Enter book details
    @Post('bookdetails')
    @UseGuards(Adminguard)
    @UsePipes(new ValidationPipe())
    async savebookdetails(@Body() reqBody: UploadBooksDto) {
        return 'okay'
    }

    // Upload book image file
    @Post('uploadbookimagefile')
    @UseGuards(Adminguard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadbooks(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1000000 }),
                //new FileTypeValidator({ fileType: 'application/pdf' } ),
                new FileTypeValidator({ fileType: 'image/jpeg' } )

            ]
        })
    ) file: Express.Multer.File) {
        
        const addendum = Date.now();
        const newFilename = addendum + file.originalname
        const isUploaded = await this.uploadService.uploadBookimage(newFilename, file.buffer);

        if (isUploaded.$metadata.httpStatusCode == 200 || isUploaded.$metadata.httpStatusCode == 201) {
            return { message: 'Image uploaded successfuly', URL: `https://${BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${newFilename}` }

        }else{
            throw new HttpException('Unable to upload image',HttpStatus.BAD_REQUEST);
        }
    }
}
