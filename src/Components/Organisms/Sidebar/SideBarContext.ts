import { createContext, SetStateAction } from 'react';

export const SideBarContext = createContext<{
  backToMenu: string;
  isInSubMenu: boolean;
  setIsInSubMenu: (value: SetStateAction<boolean>) => void;
}>({
  backToMenu: 'Back',
  isInSubMenu: false,
  setIsInSubMenu: () => {
    console.error('Sidebar component should wrap that component');
  },
});
