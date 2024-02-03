import * as env from 'env-var';
import {config} from 'dotenv';

config();

export const JWT_SECRET = env.get('JWT_SECRET').asString();
export const JWT_EXPIRES = env.get('JWT_EXPIRES').asString();
export const AWS_ACCESS_KEY_ID  = env.get('AWS_ACCESS_KEY_ID').asString();
export const AWS_SECRET_ACCESS_KEY  = env.get('AWS_SECRET_ACCESS_KEY').asString();
export const AWS_S3_REGION  = env.get('AWS_S3_REGION').asString();
export const BUCKET_NAME  = env.get('BUCKET_NAME').asString();
export const MONGODB_DB_CONNECTION  = env.get('MONGODB_DB_CONNECTION').asString();
export const PORT  = env.get('PORT').asString();



