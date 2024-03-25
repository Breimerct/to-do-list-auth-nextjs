"use client";
import { useTaskStore } from "@/store/task.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";
import TaskItem from "./task-item";

const TaskList = () => {
    const { fetchTasks, tasks } = useTaskStore();
    const { user } = useUserStore();

    useEffect(() => {
        if (tasks.length === 0 && user) fetchTasks(user._id);

        return () => {};
    }, [user]);

    return (
        <ul className="w-full flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;
