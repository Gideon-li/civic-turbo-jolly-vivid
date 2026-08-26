import { create } from "zustand";
import { persist } from "zustand/middleware";

type Notes = Record<string, string>;

type WatchState = {
  codes: string[];
  notes: Notes;
  toggle: (code: string) => void;
  has: (code: string) => boolean;
  setNote: (code: string, note: string) => void;
};

export const useWatchlist = create<WatchState>()(
  persist(
    (set, get) => ({
      codes: ["300750", "002594", "600036", "002371"],
      notes: {},
      toggle: (code) =>
        set((s) => ({
          codes: s.codes.includes(code) ? s.codes.filter((c) => c !== code) : [...s.codes, code],
        })),
      has: (code) => get().codes.includes(code),
      setNote: (code, note) => set((s) => ({ notes: { ...s.notes, [code]: note } })),
    }),
    { name: "hengyan-watch" },
  ),
);
