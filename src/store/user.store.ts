import { create } from "zustand";

type State = {
    user: UserDto | null;
};

type Actions = {
    setUser: (user: UserDto) => void;
    clearUser: () => void;
};

const initialState: State = {
    user: null,
};

export const useUserStore = create<State & Actions>((set) => ({
    ...initialState,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
}));
