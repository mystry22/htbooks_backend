import * as bcrypt from 'bcrypt';

export class Bcrypthelper {

    static async encryptyPassword(pass:string) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;


    }

  
}