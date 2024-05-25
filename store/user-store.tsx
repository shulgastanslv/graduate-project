import create from 'zustand';

interface UserState {
  username: string | null;
  setUserName: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    username: null,
    setUserName: (name) => set({ username: name }),
}));
