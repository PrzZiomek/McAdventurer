import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import styled from "styled-components";
import { Div } from "../../ui/Div";


const ThemesToggleWrapper = styled(Div)`
    left: calc(50% - 43px);
    bottom: 100%;
    text-align: center;
    position: absolute;
    color: #3e3e28;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 20px;
    border-bottom: 20px solid white;
    border-left: 17px solid transparent;
    border-right: 19px solid transparent;
    height: 0;
    width: 105px;

    &::hover{
        color: #C7C7A9;
    }
`

interface ToggleBar{
    toggle: Dispatch<SetStateAction<boolean>>;
    toggleState: boolean;
}


export const ThemesToggleBar: FC<ToggleBar> = (props) => {

    const handleClick = () => {
        props.toggle(!props.toggleState)
    }

    return(
        <ThemesToggleWrapper onClick={handleClick}> Themes </ThemesToggleWrapper>
    ) 
}
