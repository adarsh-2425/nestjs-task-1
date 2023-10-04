import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: 'user'})
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);