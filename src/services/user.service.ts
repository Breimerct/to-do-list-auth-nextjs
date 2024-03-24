import {
    hashPassword,
    hideEmail,
    lowerCaseObject,
    validateMongoId,
} from "@/helpers/utils";
import connectDB from "@/lib/mongo";
import UserModel from "@/models/user.model";

export const createUser = async (user: UserDto) => {
    try {
        connectDB();
        const lowerCaseUser = lowerCaseObject<UserDto>(user);
        const existingUser = await UserModel.findOne({
            email: lowerCaseUser.email,
        });

        if (existingUser) {
            throw new Error(
                `User with email ${hideEmail(lowerCaseUser.email)} already exists`
            );
        }

        const hashedPassword = await hashPassword(lowerCaseUser.password);
        lowerCaseUser.password = hashedPassword;

        const newUser = new UserModel(lowerCaseUser);
        await newUser.save();

        return newUser;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const updateUser = async (id: string, user: UserDto) => {
    try {
        connectDB();
        validateMongoId(id);

        const existingUser = await UserModel.findById(id);
        const lowerCaseUser = lowerCaseObject<UserDto>(user);

        if (!existingUser) {
            throw new Error(`User with id ${id} not found`);
        }

        if (lowerCaseUser.email && lowerCaseUser.email !== existingUser.email) {
            const existingUserEmail = await UserModel.findOne({
                email: lowerCaseUser.email,
            });
            if (existingUserEmail) {
                throw new Error(
                    `User with email ${hideEmail(lowerCaseUser.email)} already exists`
                );
            }
        }

        lowerCaseUser.name = lowerCaseUser.name || existingUser.name;
        lowerCaseUser.lastname = lowerCaseUser.lastname || existingUser.lastname;
        lowerCaseUser.email = lowerCaseUser.email || existingUser.email;
        lowerCaseUser.fullName = `${lowerCaseUser.name} ${lowerCaseUser.lastname}`;

        const updatedUser = await UserModel.findByIdAndUpdate(id, lowerCaseUser, {
            new: true,
        });

        return updatedUser;
    } catch (error) {
        throw new Error(String(error));
    }
};
