import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class Admins{

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;


    @Prop({default: now()})
    reg_date: Date;

    @Prop()
    role: string;

    @Prop()
    uniqueKey: string;


}

export const adminSchema = SchemaFactory.createForClass(Admins);
