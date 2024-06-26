import { Document, Schema, Types, model, models } from "mongoose";

export interface TaskDocument extends Document {
    userId: Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
}

const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    completed: { type: Boolean, default: false },
});

const taskModel = models.Task || model<TaskDocument>("Task", taskSchema);

export default taskModel;
