import * as env from 'env-var';
import {config} from 'dotenv';

config();

export const JWT_SECRET = env.get('JWT_SECRET').asString();
export const JWT_EXPIRES = env.get('JWT_EXPIRES').asString();
