import axios, { AxiosError, isAxiosError } from "axios";
import { create } from "zustand";
import { useUserStore } from "./user.store";
import { TaskDto } from "@/dto/task.dto";
import { useCommonStore } from "./common.store";
import { toast } from "react-toastify";

type State = {
    tasks: TaskDto[];
    taskSelected: TaskDto | null;
    loadingTasks: boolean;
};

type Actions = {
    fetchTasks: (userId: string) => void;
    createTask: (task: TaskDto) => void;
    updateTask: (id: string, task: TaskDto) => void;
    deleteTask: (id: string) => void;
    setTaskSelected: (task: TaskDto | null) => void;
    setTasks: (tasks: TaskDto[]) => void;
    setLoadingTasks: (loading: boolean) => void;
};

const initialState: State = {
    tasks: [],
    taskSelected: null,
    loadingTasks: false,
};

const { showGlobalLoading, hideGlobalLoading } = useCommonStore.getState();

export const useTaskStore = create<State & Actions>((set) => ({
    ...initialState,

    fetchTasks: async (userId) => {
        set({ loadingTasks: true });
        try {
            const { data } = await axios.get<TaskDto[]>(`/api/task/user/${userId}`);
            set({ tasks: data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loadingTasks: false });
        }
    },

    createTask: async (task) => {
        showGlobalLoading();
        try {
            await axios.post<TaskDto>("/api/task", task);

            set({ taskSelected: null });

            toast.success("Tarea creada correctamente");

            useTaskStore.getState().fetchTasks(task.userId as string);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Error al crear tarea");
            }
            useTaskStore.getState().fetchTasks(task.userId as string);
        } finally {
            hideGlobalLoading();
        }
    },

    updateTask: async (id, task) => {
        try {
            await axios.patch<TaskDto>(`/api/task/${id}`, task);

            set({ taskSelected: null });

            toast.success("Tarea actualizada correctamente");

            useTaskStore.getState().fetchTasks(task.userId as string);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Error al actualizar tarea");
            }

            useTaskStore.getState().fetchTasks(task.userId as string);
        }
    },

    deleteTask: async (id) => {
        const { data } = await axios.delete(`/api/task/${id}`);
        set((state) => ({
            tasks: state.tasks.filter((t) => t._id !== id),
        }));

        toast.success(data.message);
    },

    setTaskSelected: (task) => set({ taskSelected: task }),

    setTasks: (tasks) => set({ tasks }),

    setLoadingTasks: (loading) => set({ loadingTasks: loading }),
}));
