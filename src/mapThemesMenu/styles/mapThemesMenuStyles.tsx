import styled from "styled-components";
import { Div } from "../../ui/Div";

export const ThemesMenu = styled(Div)`
    display: flex;
    flex-wrap: nowrap;
    img{
        width: 11%;
        transition: .2s;
    }
    img:hover{
        width: 20%;
    }
`