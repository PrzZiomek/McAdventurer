import React, { FC, useState } from "react"
import { ToggleBarProps } from "../../../../ui/types";
import { ErrorModalStyled } from "../../styles/errorModalStyled"
import { ToggleButton } from "../modalButton";


export const ErrorModal: FC = () => {

   const [toggleState, setToggler] = useState<{show: boolean}>({show: true}); 

   const setTogglerHandler = (bool: boolean) => setToggler({show: bool})

   if(toggleState.show){
       return (
            <ErrorModalStyled>
                  <h1>Problem with server communication, some app functionalities are not working</h1>
                  <ToggleButton
                        toggle={setTogglerHandler} 
                        toggleState={toggleState.show}
                     >
                        OK
                  </ToggleButton>
            </ErrorModalStyled>
         )
   }
   else{ 
      toggleState.show = true;
      return null;
   }

}

