import { hideEmail, validatePassword } from "@/helpers/utils";
import connectDB from "@/lib/mongo";
import UserModel from "@/models/user.model";

export const login = async (email: string, password: string) => {
    try {
        connectDB();
        if (!email) {
            throw new Error("email required");
        }

        if (!password) {
            throw new Error("password required");
        }

        const lowerCaseEmail = email.toLowerCase();
        const user = await UserModel.findOne({ email: lowerCaseEmail });

        if (!user) {
            throw new Error(`User with email ${hideEmail(lowerCaseEmail)} not found`);
        }

        const isPasswordValid = await validatePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return user;
    } catch (error) {
        throw new Error(String(error));
    }
};
