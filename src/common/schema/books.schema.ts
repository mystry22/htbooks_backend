import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class Admins{

    @Prop()
    book_name: string;

    @Prop()
    author: string;

    @Prop()
    release_year: string;


    @Prop()
    author_email: string;

    @Prop()
    author_id: string;

    @Prop()
    book_image: string;

    @Prop()
    book_s3_file_name: string;

    @Prop()
    book_s3_image_link: string;

    @Prop({default: now()})
    upload_date: Date;


}

export const adminSchema = SchemaFactory.createForClass(Admins);
