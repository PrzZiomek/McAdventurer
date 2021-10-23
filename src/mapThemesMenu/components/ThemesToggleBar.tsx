import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import styled from "styled-components";
import { Div } from "../../ui/Div";
import { ToggleBar } from "../../ui/ToggleBar";


const ThemesToggleBarStyled = styled(Div)`
    left: calc(50% - 43px);
    bottom: 100%;
    text-align: center;
    position: absolute;
    color: #3e3e28;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 20px;
    border-bottom: 20px solid #F7F7F3;
    border-left: 17px solid transparent;
    border-right: 19px solid transparent;
    height: 0;

    &::hover{
        color: #C7C7A9;
    }
`

export const ThemesToggleBar: FC<ToggleBar> = (props) => ToggleBar(props)(ThemesToggleBarStyled);
