import React, { FC, LegacyRef, MouseEventHandler, MutableRefObject } from "react";


interface Props{
    className?: string;
    color?: string;
    actualRef?: MutableRefObject<null> | LegacyRef<HTMLDivElement>
    mapRef?: MutableRefObject<null>;
    bigScreenFit?: boolean;
    mainWrapperRef?: (el: HTMLDivElement) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    showUpBar?:boolean;
}


export const DivWrapper: FC <Props> = (props) => {

    const setActualRef = (props: Props) => {
        if(props.mapRef) return props.mapRef;
        if(props.mainWrapperRef) return props.mainWrapperRef;
    }
 
    return(
        <Div actualRef={setActualRef(props)} {...props} />
    )
}


export const Div: FC <Props> = (props) => (
    <div 
        ref={props.actualRef} 
        className={props.className}
        onClick={props.onClick}
    > 
      {props.children}
    </div>
)