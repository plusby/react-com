import { createContext } from 'react'


interface MenuContextProps {
  index: number;
  onSelect?: (selectedIndex: number)=>void;
  mode?: string;
  defaultOpenArr?: array;
}

export const MenuContext = createContext<MenuContextProps>({index:0})
