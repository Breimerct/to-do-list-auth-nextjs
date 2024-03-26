import { UserDto } from "@/dto/user.dto";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

type State = {
    user: UserDto | null;
};

type Actions = {
    setUser: (user: UserDto) => void;
    clearUser: () => void;
    updateProfile: (user: UserDto) => void;
};

const initialState: State = {
    user: null,
};

export const useUserStore = create<State & Actions>((set) => ({
    ...initialState,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    updateProfile: async (user) => {
        try {
            const { data } = await axios.patch<UserDto>(
                `/api/user/update/${user._id}`,
                user
            );

            set({ user: data });
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Perfil actualizado correctamente.");
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    },
}));
