import { UserDto } from "@/dto/user.dto";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useCommonStore } from "./common.store";

type State = {
    user: UserDto | null;
};

type Actions = {
    setUser: (user: UserDto) => void;
    clearUser: () => void;
    updateProfile: (user: UserDto) => Promise<boolean>;
};

const initialState: State = {
    user: null,
};

const { showGlobalLoading, hideGlobalLoading } = useCommonStore.getState();

export const useUserStore = create<State & Actions>((set) => ({
    ...initialState,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    updateProfile: async (user) => {
        showGlobalLoading();
        try {
            const { data } = await axios.patch<UserDto>(
                `/api/user/update/${user._id}`,
                user
            );

            set({ user: data });
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Perfil actualizado correctamente.");

            return true;
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }

            return false;
        } finally {
            hideGlobalLoading();
        }
    },
}));
