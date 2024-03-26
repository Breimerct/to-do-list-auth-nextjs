"use client";
import { useTaskStore } from "@/store/task.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";
import TaskItem from "./task-item";
import TaskItemSkeleton from "./task-item-skeleton";
import { MoodSearchIcon } from "./icons";
import { usePathname } from "next/navigation";

const TaskList = () => {
    const { fetchTasks, tasks, loadingTasks, setLoadingTasks } = useTaskStore();
    const { user } = useUserStore();
    const pathName = usePathname();

    useEffect(() => {
        setLoadingTasks(true);
        if (user && (tasks.length === 0 || pathName === "/")) fetchTasks(user._id);

        return () => {};
    }, [user, pathName]);

    return (
        <ul className="w-full flex flex-col gap-4 mt-4">
            {tasks.length <= 0 &&
                loadingTasks &&
                Array.from({ length: 3 }).map((_, index) => (
                    <TaskItemSkeleton key={index} />
                ))}

            {!loadingTasks &&
                tasks.map((task) => <TaskItem key={task._id} task={task} />)}

            {tasks.length <= 0 && !loadingTasks && (
                <li className="w-full text-center text-gray-400 text-4xl font-semibold capitalize">
                    <figure>
                        <MoodSearchIcon size={100} className="mx-auto" />
                    </figure>
                    No hay tareas <br /> para mostrar
                </li>
            )}
        </ul>
    );
};

export default TaskList;
