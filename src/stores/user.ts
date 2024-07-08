import { User } from "@/types/generic";
import { create } from "zustand";

type StateProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<StateProps>((set, get) => ({
  user: null,
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
}));
