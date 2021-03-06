import { createContext, CSSProperties, SetStateAction } from 'react';

export const SideBarContext = createContext<{
  backToMenu: string;
  height: CSSProperties['height'];
  isInSubMenu: boolean;
  setIsInSubMenu: (value: SetStateAction<boolean>) => void;
  unfixed?: boolean;
  width: CSSProperties['width'];
}>({
  backToMenu: 'Back',
  height: '100%',
  isInSubMenu: false,
  setIsInSubMenu: () => {
    console.error('SideBar component should wrap that component');
  },
  unfixed: false,
  width: '250px',
});
