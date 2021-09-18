import React, { Fragment, useState, useEffect, ChangeEvent, MouseEvent, KeyboardEventHandler, KeyboardEvent, createRef, FC, ChangeEventHandler } from "react";
import { BrowserInput, InputButton, InputTextWrapper } from "./styles/DestinationBroowserStyle";

import { BrowserWrapper } from "./styles/DestinationBroowserStyle";


interface DestinationBrowserProps{
    countryNames:  string[];
}

export const DestinationBrowser: FC<DestinationBrowserProps> = (props) => {

    const [filtered, getCountryName] = useState<string[]>([]);
    const [typed, getTypedValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.toLowerCase();
        const pickIfMatch = (name: string) =>{ 
            if(value.length > 2){
                return name.toLowerCase().slice(0,3) === value.slice(0,3);
            }       
         //   if(value.length > 5){
          //      return name.toLowerCase().slice(0,5) === value.slice(0,5);
          //  } 
        };     
       const filtered = props.countryNames.filter(pickIfMatch);
       getCountryName(filtered);
       getTypedValue(value);
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const value = e.currentTarget.innerText;
        getCountryName([]);
        getTypedValue(value);
        alert(`selected country: ${value}`);
    }

    const showPropositionValue = (val: string) => {
        const firstPart = val.slice(0, 3);
        const secondPart = val.slice(3,val.length);
        return(
          <>
            <span>{firstPart}</span><span>{secondPart}</span>
          </>
        )
    }

    return (
        <BrowserWrapper> 
            <BrowserInput visibleText={true} handleChange={handleChange}/>
            <InputButton handleClick={handleClick} >search</InputButton>
            <InputTextWrapper>
                {filtered[0] && showPropositionValue(filtered[0])}
            </InputTextWrapper> 
        </BrowserWrapper>
    )
}