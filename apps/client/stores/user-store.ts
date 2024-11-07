import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';

interface UserState {
  name: string;
  profileUrl: string;
  setName: (name: string) => void;
  setProfileUrl: (url: string) => void;
}

export const useUserStore = create(
  persist<UserState>(
    set => ({
      name: '이창민',
      profileUrl: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
      setName: name => set({ name }),
      setProfileUrl: url => set({ profileUrl: url }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
