import styled from "styled-components";
import { Div, DivWrapper } from "../../../ui/Div";
import  mainImage  from "../../../Belfast.jpg";


export const SearchMapStyled = styled(DivWrapper)`
    display: flex;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-image: url(${mainImage});
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    flex-wrap: wrap;
    overflow: hidden;
`;
