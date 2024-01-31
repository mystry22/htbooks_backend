import { Injectable } from '@nestjs/common';
import {AWS_S3_REGION,AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,BUCKET_NAME} from 'src/common/config/env.config'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({region: AWS_S3_REGION});
    async uploadBookimage(fileName: string, file: Buffer){
        const isUploaded = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'htbooks-s3-bucket',
                Key: fileName,
                Body: file,
                ACL: 'public-read'
            })
        )

        return isUploaded;
    }
}
