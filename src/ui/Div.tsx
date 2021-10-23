import React, { FC, LegacyRef, MouseEventHandler, MutableRefObject } from "react";


export interface DivProps{
    className?: string;
    color?: string;
    actualRef?: MutableRefObject<null> | LegacyRef<HTMLDivElement>
    mapRef?: MutableRefObject<null>;
    mainWrapperRef?: (el: HTMLDivElement) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    showUpBar?: boolean;
    switchToggleArrow?: boolean;
}


export const DivWrapper: FC<DivProps> = (props) => {

    const setActualRef = (props: DivProps) => {
        if(props.mapRef) return props.mapRef;
        if(props.mainWrapperRef) return props.mainWrapperRef;
    }
 
    return(
        <Div actualRef={setActualRef(props)} {...props} />
    )
}


export const Div: FC<DivProps> = (props) => (
    <div 
        ref={props.actualRef} 
        className={props.className}
        onClick={props.onClick}
    > 
      {props.children}
    </div>
)