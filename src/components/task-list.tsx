"use client";
import { useTaskStore } from "@/store/task.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

const TaskList = () => {
    const { fetchTasks, tasks } = useTaskStore();
    const { user } = useUserStore();

    useEffect(() => {
        if (tasks.length === 0 && user) fetchTasks(user._id);

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>{task.title}</li>
            ))}
        </ul>
    );
};

export default TaskList;
