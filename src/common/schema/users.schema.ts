import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class Users{

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    isLicensed: string;

    @Prop()
    isEnabled: string;

    @Prop({default: now()})
    reg_date: Date;

    @Prop()
    phone: string;

    @Prop()
    uuid_code: string;


}

export const userSchema = SchemaFactory.createForClass(Users);
