"use client";
import React from "react";
import { EditIcon, TrashIcon } from "./icons";
import { useTaskStore } from "@/store/task.store";
import Swal from "sweetalert2";
import Input from "./input";

interface TaskItemProps {
    task: TaskDto;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { deleteTask } = useTaskStore();

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

    return (
        <li
            className={`w-full flex items-center p-4 shadow-md rounded-md ${
                task.completed
                    ? "bg-green-500/50 text-black/50 line-through"
                    : "bg-red-400 text-white"
            }`}
        >
            <div className="flex-1 flex flex-row flex-nowrap items-center gap-4">
                <div className="flex">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        disabled={task.completed}
                        onChange={() => {
                            task.completed = !task.completed;
                        }}
                    />
                </div>

                <div className="flex-1">
                    <p className="font-semibold text-xl">{task.title}</p>
                    <p className="text-sm italic">{task.description}</p>
                </div>
            </div>

            <div className="flex gap-2 flex-nowrap items-center">
                <button className="bg-orange-400 hover:bg-orange-300 hover:shadow-md text-white transition-all p-2 rounded-full w-10 h-10">
                    <EditIcon size={24} />
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 hover:shadow-md text-white transition-all p-2 rounded-full w-10 h-10"
                    onClick={confirmDelete}
                >
                    <TrashIcon size={24} />
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
