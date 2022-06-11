import { FC } from "react"
import { DetailsContentStyled } from "./styles/DetailsContentStyled"

interface DetailsContent {
   headerText: string | undefined;
   localizationError: JSX.Element | null 
}

export const DetailsContent: FC<DetailsContent> = (props) => {

   return ( 
      <DetailsContentStyled>
      `   <h2> {props.headerText} </h2>
         <div>
            {props.localizationError}
            <p></p>
         </div>
      </DetailsContentStyled>
   )
}