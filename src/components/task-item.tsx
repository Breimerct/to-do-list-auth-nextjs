"use client";
import React from "react";
import { EditIcon, TrashIcon } from "./icons";
import { useTaskStore } from "@/store/task.store";
import Swal from "sweetalert2";
import Input from "./input";
import { TaskDto } from "@/dto/task.dto";

interface TaskItemProps {
    task: TaskDto;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { deleteTask, updateTask, setTaskSelected, tasks, setTasks } = useTaskStore();

    const confirmDelete = async () => {
        const { value } = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Si eliminas esta tarea no podras recuperarla!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        });

        if (value && task._id) deleteTask(task._id);
    };

    const selectTask = () => {
        setTaskSelected(task);
    };

    const updateStatusTask = () => {
        setTasks(
            tasks.map((t) => {
                if (t._id === task._id) {
                    return { ...t, completed: !t.completed };
                }
                return t;
            })
        );

        updateTask(task._id as string, { ...task, completed: !task.completed });
    };

    return (
        <li
            className={`w-full flex gap-4 items-center p-4 shadow-md rounded-md ${
                task.completed
                    ? "bg-green-300 text-black/50 line-through"
                    : "bg-red-400 text-white"
            }`}
        >
            <div className="flex-1 flex flex-row flex-nowrap items-center gap-4">
                <div className="flex">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        disabled={task.completed}
                        onChange={updateStatusTask}
                    />
                </div>

                <div className="break-all overflow-y-auto scroll-smooth scrollbar transition-all">
                    <p
                        className={`font-semibold text-xl sticky top-0 ${
                            task.completed
                                ? "bg-green-300 text-black/50 line-through"
                                : "bg-red-400 text-white"
                        }`}
                    >
                        {task.title}
                    </p>
                    <p className="text-sm max-h-20 font-mono pr-4">{task.description}</p>
                </div>
            </div>

            <div className="flex gap-2 flex-nowrap items-center">
                <button className="btn-warning-icon" type="button" onClick={selectTask}>
                    <EditIcon size={24} />
                </button>
                <button className="btn-danger-icon" type="button" onClick={confirmDelete}>
                    <TrashIcon size={24} />
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
