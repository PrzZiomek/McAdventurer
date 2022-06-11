import { FC, ForwardedRef, LegacyRef, MouseEventHandler, MutableRefObject, RefObject } from "react";

export interface DivProps{
    /** Required by default */
    className?: string;     
    /** identifier */
    id?: string;
    /** to set color if need be */
    color?: string;   
    /** used with expanding hintsList in Panel */
    showHints?: boolean;
    /** used in DivWrapper to apply proper ref to individual div  */
    actualRef?: MutableRefObject<null> | LegacyRef<HTMLDivElement> | ForwardedRef<unknown> | RefObject<HTMLDivElement | unknown>
    /** to get map element ref  */
    mapRef?: MutableRefObject<null>;
    /** used in ToggleBar  */                                                                      
    onClick?: MouseEventHandler<HTMLDivElement>;
    /** used to show and hide Panel and themes  */
    showUpBar?: boolean;
    /** used in Panel toggle bar arrow  */
    switchToggleArrow?: boolean;
    /** to show Panel */
    showPanel?: boolean;
    /** to switching visibility state of modals, panels etc. */
    toggleState?: boolean;
    /** to change border on DestinatonBrowser input */
    changeBorder?: boolean;
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