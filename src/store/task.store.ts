import axios from "axios";
import { create } from "zustand";
import { useUserStore } from "./user.store";

type State = {
    tasks: TaskDto[];
};

type Actions = {
    fetchTasks: (userId: string) => void;
    createTask: (task: TaskDto) => void;
    updateTask: (id: string, task: TaskDto) => void;
    deleteTask: (id: string) => void;
};

const initialState: State = {
    tasks: [],
};

export const useTaskStore = create<State & Actions>((set) => ({
    ...initialState,

    fetchTasks: async (userId) => {
        const { data } = await axios.get<TaskDto[]>(`/api/task/user/${userId}`);
        set({ tasks: data });
    },

    createTask: async (task) => {
        const { data } = await axios.post<TaskDto>("/api/task", task);
        set((state) => ({ tasks: [...state.tasks, data] }));
    },

    updateTask: async (id, task) => {
        const { data } = await axios.patch<TaskDto>(`/api/task/${id}`, task);
        set((state) => ({
            tasks: state.tasks.map((t) => (t._id === data._id ? data : t)),
        }));
    },

    deleteTask: async (id) => {
        await axios.delete(`/api/task/${id}`);
        set((state) => ({
            tasks: state.tasks.filter((t) => t._id !== id),
        }));
    },
}));
