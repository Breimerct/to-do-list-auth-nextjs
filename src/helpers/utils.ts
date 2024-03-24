import UserModel, { UserDocument } from "@/models/user.model";
import * as bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";

export const hashPassword = async (password: string) => {
    if (!password) {
        throw new Error("password required");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
};

export const validatePassword = async (password: string, hashPassword: string) => {
    if (!password) {
        throw new Error("password required");
    }

    if (!hashPassword) {
        throw new Error("hashPassword required");
    }

    return await bcrypt.compare(password, hashPassword);
};

export const hideEmail = (email: string) => {
    if (!email) {
        throw new Error("email required");
    }

    const userEmail = email.toLowerCase();
    const [username, domain] = userEmail.split("@");
    const [host, extension] = domain.split(".");

    const hiddenUsername = username.slice(0, 2) + "*".repeat(username.length - 2);
    const hiddenDomain = "*".repeat(host.length) + `.${extension}`;

    return `${hiddenUsername}@${hiddenDomain}`;
};

export const validateMongoId = (id: string) => {
    if (!id) {
        throw new Error("id required");
    }

    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        throw new Error("id is not valid");
    }
};

export const lowerCaseObject = <T>(object: T | any): T => {
    const { password, ...restOfObject } = object;
    const objectString = JSON.stringify(restOfObject).toLowerCase();
    const objectJson = JSON.parse(objectString);

    return {
        ...objectJson,
        password,
    };
};
