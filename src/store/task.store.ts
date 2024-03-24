import { create } from "zustand";

type State = {};

type Actions = {};

const initialState: State = {};

export const useTaskStore = create<State & Actions>((set) => ({
    ...initialState,
}));
