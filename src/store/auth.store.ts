import { create } from "zustand";
import { useUserStore } from "./user.store";
import axios, { Axios, AxiosError } from "axios";
import { UserDto } from "@/dto/user.dto";
import { useCommonStore } from "./common.store";
import { toast } from "react-toastify";

type State = {};

type Actions = {
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: UserDto) => Promise<boolean>;
    logout: () => void;
    changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
};

const initialState: State = {};

const { showGlobalLoading, hideGlobalLoading } = useCommonStore.getState();
const { setUser, clearUser, user } = useUserStore.getState();

export const useAuthStore = create<State & Actions>((set) => ({
    ...initialState,

    login: async (email, password) => {
        try {
            showGlobalLoading();
            const { data } = await axios.post<UserDto>("/api/auth/login", {
                email,
                password,
            });

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            return true;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "Error al iniciar sesión");
            }
            return false;
        } finally {
            hideGlobalLoading();
        }
    },

    register: async (user) => {
        try {
            showGlobalLoading();
            const { data } = await axios.post("/api/auth/register", user);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));

            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "Error al registrar usuario");
            }
            return false;
        } finally {
            hideGlobalLoading();
        }
    },

    logout: () => {
        clearUser();
        localStorage.removeItem("user");
    },

    changePassword: async (oldPassword, newPassword) => {
        try {
            showGlobalLoading();
            const { data } = await axios.put(`/api/auth/change-password/${user?._id}`, {
                oldPassword,
                newPassword,
            });

            toast.success(data.message);

            return true;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error.response?.data.message || "Error al cambiar contraseña"
                );
            }
            return false;
        } finally {
            hideGlobalLoading();
        }
    },
}));
