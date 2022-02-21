import { FC, LegacyRef, MouseEventHandler, MutableRefObject } from "react";

export interface DivProps{
    /* Required by default */
    className?: string;     
    /* identifier */
    id?: string;
    /* to set color if need be */
    color?: string;   
    /* used in DivWrapper to apply proper ref to individual div  */
    actualRef?: MutableRefObject<null> | LegacyRef<HTMLDivElement> 
    /* to get map element ref  */
    mapRef?: MutableRefObject<null>;
    /* used in ToggleBar  */                                                                       //   mainWrapperRef?: (el: HTMLDivElement) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    /* used to show and hide Panel and themes  */
    showUpBar?: boolean;
    /* used in Panel toggle bar arrow  */
    switchToggleArrow?: boolean;
    /* used in ErrorModal */
    showModal?: boolean;
}



export const DivWrapper: FC<DivProps> = (props) => {

    const setActualRef = (props: DivProps) => {
        if(props.mapRef) return props.mapRef;
    }
 
    return(
        <Div actualRef={setActualRef(props)} {...props} />
    )
}


export const Div: FC<DivProps> = (props) => (
    <div 
        id={props.id}
        ref={props.actualRef} 
        className={props.className}
        onClick={props.onClick}
    > 
      {props.children}
    </div>
)