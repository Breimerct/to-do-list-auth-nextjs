import { create } from "zustand";

type State = {};

type Actions = {};

const initialState: State = {};

export const useUserStore = create<State & Actions>((set) => ({
    ...initialState,
}));
