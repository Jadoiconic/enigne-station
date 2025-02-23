import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    role: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "User must have name"],
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide Email"],
        lowercase: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlenght: 6,
        select: false,
    },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
