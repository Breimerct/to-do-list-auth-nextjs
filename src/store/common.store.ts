import { create } from "zustand";

type State = {
    globalLoading: boolean;
};

type Actions = {
    showGlobalLoading: () => void;
    hideGlobalLoading: () => void;
};

const initialState: State = {
    globalLoading: false,
};

export const useCommonStore = create<State & Actions>((set) => ({
    ...initialState,

    showGlobalLoading: () => {
        set({ globalLoading: true });
    },

    hideGlobalLoading: () => {
        set({ globalLoading: false });
    },
}));
