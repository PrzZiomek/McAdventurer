import { type } from "os";
import { FC } from "react";
import { StyledComponent } from "styled-components";
import { DivProps } from "../Div";
import { ToggleBarWithChildren } from "../types";

  
export const ToggleBar = (props: ToggleBarWithChildren) => {

   return (StyledComponent: StyledComponent<FC<DivProps>, any, {}, never>): JSX.Element  => {
    
        const handleClick = () => {
            props.toggle(!props.toggleState);        
        }
        
        return(
            <StyledComponent {...props} onClick={handleClick} > {props.children} </StyledComponent>
        ) 
    }

}