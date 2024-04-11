/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface UserState {
  name: string;
  email: string;
  password?: string;
}

const useUserStore = create(
  persist(
    set => ({
      user: null,
      login: (user: UserState) => set(() => ({user: user})),
      logout: () => set({user: null}),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
