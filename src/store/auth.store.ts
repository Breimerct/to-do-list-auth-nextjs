import { create } from "zustand";
import { useUserStore } from "./user.store";
import axios from "axios";
import { UserDto } from "@/dto/user.dto";
import { useCommonStore } from "./common.store";

type State = {};

type Actions = {
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: UserDto) => Promise<boolean>;
    logout: () => void;
};

const initialState: State = {};

const { showGlobalLoading, hideGlobalLoading } = useCommonStore.getState();
const { setUser, clearUser } = useUserStore.getState();

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
        } catch (error) {
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
            return false;
        } finally {
            hideGlobalLoading();
        }
    },

    logout: () => {
        clearUser();
        localStorage.removeItem("user");
    },
}));
