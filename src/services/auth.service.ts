import { hashPassword, validatePassword } from "@/helpers/utils";
import connectDB from "@/lib/mongo";
import UserModel from "@/models/user.model";
import { use } from "react";

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

export const changePassword = async (
    oldPassword: string,
    newPassword: string,
    userId: string
) => {
    try {
        connectDB();
        if (!oldPassword) {
            throw new Error("Contraseña actual es requerida");
        }

        if (!newPassword) {
            throw new Error("Contraseña nueva es requerida");
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const isPasswordValid = await validatePassword(oldPassword, user.password);

        if (!isPasswordValid) {
            throw new Error("Contraseña actual incorrecta");
        }

        const isValidPassword = await validatePassword(newPassword, user.password);

        if (isValidPassword) {
            throw new Error("La nueva contraseña debe ser diferente a la actual");
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
            new: true,
        });

        return updatedUser;
    } catch (error) {
        throw new Error(String(error));
    }
};
