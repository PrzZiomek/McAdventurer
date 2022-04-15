import { Dispatch, ReactNode, SetStateAction } from "react";

type ToggleHandler = (bool: boolean) => void;

export interface ToggleBarProps{
   toggle: Dispatch<SetStateAction<boolean>> | ToggleHandler; 
   toggleState: boolean;
   switchToggleArrow?: boolean;
   className?: string;
}

export type ToggleBarWithChildren = ToggleBarProps & { children?: ReactNode };