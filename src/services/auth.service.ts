import { hideEmail, validatePassword } from "@/helpers/utils";
import connectDB from "@/lib/mongo";
import UserModel from "@/models/user.model";

export const login = async (email: string, password: string) => {
    try {
        connectDB();
        if (!email) {
            throw new Error("Email requerido");
        }

        if (!password) {
            throw new Error("Contraseña requerida");
        }

        const lowerCaseEmail = email.toLowerCase();
        const user = await UserModel.findOne({ email: lowerCaseEmail });

        if (!user) {
            throw new Error(`Usuario con email ${lowerCaseEmail} no encontrado.`);
        }

        const isPasswordValid = await validatePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        return user;
    } catch (error) {
        throw new Error(String(error));
    }
};
