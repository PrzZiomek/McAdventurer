import { FC } from "react"
import styled from "styled-components";
import { LoaderStyled } from "./LoaderStyled";
import { Div } from "../../Div";
import { Span } from "../../Span";


export const LoaderInfoStyled = styled(Div)`
   position: absolute;
   z-index: 100; 
   top: 100px;
   left: 50%; 
   transform: translateX(-50%);
   width: 100%;
   height: 400px;
   text-align: center;
   font-size: 1.2rem;
   color: #3E3E28; 
   font-family: 'Open Sans', sans-serif; 

   @media (min-width: 768px){
      font-size: 1.4rem;
      padding-top: 50px;
   }
`; 



export const LoaderInfo: FC = (props) => {

   return(
      <LoaderInfoStyled>
          <Span>{props.children}</Span>
          <LoaderStyled />
      </LoaderInfoStyled>
   )
}