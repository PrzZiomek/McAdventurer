import React, { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent, SetStateAction } from "react"
import styled from "styled-components";
import { Loader } from "../../styles/Loader";
import { Div } from "../Div";
import { Span } from "../Span";


export const LoaderInfoStyled = styled(Div)`
   position: absolute;
   z-index: 1000; 
   top: 30%;
   left: 50%; 
   transform: translateX(-50%);
   width: 100%;
   height: 400px;
   text-align: center;
   font-size: 2rem;
   color: #3E3E28;
   font-family: 'Open Sans', sans-serif; 
`;



export const LoaderInfo: FC = (props) => {

   return(
      <LoaderInfoStyled>
          <Span>{props.children}</Span>
          <Loader />
      </LoaderInfoStyled>
   )
}