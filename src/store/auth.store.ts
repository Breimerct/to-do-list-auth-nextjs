import { create } from "zustand";
import { useUserStore } from "./user.store";
import axios from "axios";

type State = {};

type Actions = {
    login: (email: string, password: string) => void;
    register: (data: UserDto) => void;
    logout: () => void;
};

const initialState: State = {};

const { setUser, clearUser } = useUserStore.getState();

export const useAuthStore = create<State & Actions>((set) => ({
    ...initialState,

    login: async (email, password) => {
        const { data } = await axios.post<UserDto>("/api/auth/login", {
            email,
            password,
        });

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    },

    register: async (user) => {
        const { data } = await axios.post("/api/auth/register", user);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    },

    logout: () => {
        clearUser();
        localStorage.removeItem("user");
    },
}));
