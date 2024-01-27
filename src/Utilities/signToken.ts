import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/common/config/env.config';
import { JWT_EXPIRES } from 'src/common/config/env.config';

export class Signtoken{
     

    signUserToken(payload:any){
         
        return sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRES});
    }

    decodeUserToken(){

    }
}