import { type } from "os";
import { Component, Dispatch, FC, ReactNode, SetStateAction } from "react";
import { StyledComponent } from "styled-components";
import { DivProps } from "./Div";


export interface ToggleBar{
    toggle: Dispatch<SetStateAction<boolean>>; 
    toggleState: boolean;
    switchToggleArrow?: boolean;
}

type ToggleBarWithChildren = ToggleBar & { children?: ReactNode };


export const ToggleBar = (props: ToggleBarWithChildren) => 

    (StyledComponent: StyledComponent<FC<DivProps>, any, {}, never>)  => {

        const handleClick = () => {
            props.toggle(!props.toggleState)
        }

        return(
            <StyledComponent {...props} onClick={handleClick} > {props.children} </StyledComponent>
        ) 
    }