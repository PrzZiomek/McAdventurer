import React, { FC } from "react";

interface Props{
    className?: string;
    color?: string;
    mapRef?: React.MutableRefObject<null>;
}

export const Div: FC <Props> = (props) => (
    <div ref={props.mapRef} className={props.className}> {props.children} </div>
)