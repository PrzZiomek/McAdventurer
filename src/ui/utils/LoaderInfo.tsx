import React, { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent, SetStateAction } from "react"
import styled from "styled-components";
import { Loader } from "../../styles/Loader";
import { Div } from "../Div";


export const LoaderInfoStyled = styled(Div)`
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   top: 30%;
   width: 250px;
   height: 400px;
   font-size: 2rem;
   color: #3E3E28;
`;


export const LoaderInfo: FC = (props) => {

   return(
      <LoaderInfoStyled>
          {props.children}
          <Loader />
      </LoaderInfoStyled>
   )
}