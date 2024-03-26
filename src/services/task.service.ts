import { TaskDto } from "@/dto/task.dto";
import { validateMongoId } from "@/helpers/utils";
import connectDB from "@/lib/mongo";
import taskModel from "@/models/task.model";
import UserModel from "@/models/user.model";

export const createTask = async (task: TaskDto) => {
    try {
        connectDB();
        const newTask = new taskModel(task);
        await newTask.save();
        return newTask;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const updateTask = async (id: string, task: TaskDto) => {
    try {
        connectDB();

        validateMongoId(id);
        const existingTask = await taskModel.findById(id);

        if (!existingTask) {
            throw new Error(`Task with id ${id} not found`);
        }

        task.title = task.title || existingTask.title;

        const updateTask = await taskModel.findByIdAndUpdate(id, task, {
            new: true,
        });

        return updateTask;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const deleteTask = async (id: string) => {
    try {
        connectDB();

        validateMongoId(id);
        const existingTask = await taskModel;

        if (!existingTask) {
            throw new Error(`Task with id ${id} not found`);
        }

        await existingTask.deleteOne();

        return existingTask;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getTask = async (id: string) => {
    try {
        connectDB();

        validateMongoId(id);
        const existingTask = await taskModel.findById(id);

        if (!existingTask) {
            throw new Error(`Task with id ${id} not found`);
        }

        return existingTask;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getTasks = async () => {
    try {
        connectDB();
        const tasks = await taskModel.find();
        return tasks;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getTasksByUserId = async (userId: string) => {
    try {
        connectDB();

        validateMongoId(userId);

        const existingUser = await UserModel.findById(userId);

        if (!existingUser) {
            throw new Error(`User with id ${userId} not found`);
        }

        const tasks = await taskModel.find({ userId });
        return tasks;
    } catch (error) {
        throw new Error(String(error));
    }
};
