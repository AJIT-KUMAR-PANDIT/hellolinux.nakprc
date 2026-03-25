import { create } from "zustand";

type State = {
    prompt: string;
    result: string;
    loading: boolean;

    setPrompt: (prompt: string) => void;
    setResult: (result: string) => void;
    setLoading: (loading: boolean) => void;
};

// ✅ Clean Zustand store — no API logic here.
// API logic lives in app/API/ai/llm.js, which calls .getState() directly.
export const usePromptStore = create<State>((set) => ({
    prompt: "",
    result: "",
    loading: false,

    setPrompt: (prompt) => set({ prompt }),
    setResult: (result) => set({ result }),
    setLoading: (loading) => set({ loading }),
}));