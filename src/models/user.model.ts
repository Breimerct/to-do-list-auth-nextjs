import { Schema, model, Document, models } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    lastname: string;
    fullName: string;
    email: string;
    password: string;
    avatar: string;
    createAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        default: function () {
            return `${this.name} ${this.lastname}`;
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: function () {
            return `https://ui-avatars.com/api/?name=${this.fullName}&background=random`;
        },
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

const UserModel = models.User || model<UserDocument>("User", userSchema);

export default UserModel;
