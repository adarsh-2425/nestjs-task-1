import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    user_type: UserType;
}

enum UserType {
    ADMIN = "admin",
    USER = "user"
}

export const UserSchema = SchemaFactory.createForClass(User);