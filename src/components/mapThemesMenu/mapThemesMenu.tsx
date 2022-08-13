 import React, { FC, useRef, Dispatch, MouseEvent } from "react"
import { useDispatch } from "react-redux";
import { useDetectOutsideClick } from "../../customHooks/useDetectOutsideClick";
import { List } from "../../ui/List";

import { Theme } from "./models/Theme";
import { MapThemesMenuStyled } from "./styles/mapThemesMenuStyles";


interface MapThemesMenuProps{
    toggleState: boolean;
    setShowThemes: Dispatch<React.SetStateAction<boolean>>;
    ariaLabelledBy: string;
    id: string;
} 

export const MapThemesMenu: FC<MapThemesMenuProps> = (props) => { 

    const menuRef = useRef<HTMLDivElement>(null);
    useDetectOutsideClick(menuRef, () => props.setShowThemes(false));
    const dispatch = useDispatch();

    const themes = [
        'normal.day',
        'reduced.night',  
        'normal.day.transit',
        'normal.night',
        'normal.day.grey',
        'normal.night.grey',                 
        'reduced.day',
        'pedestrian.night',
        'pedestrian.day',
        
    ];

    const onChangeTheme = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        const themeElement = e.target as HTMLImageElement;    
        dispatch({type: "SET_MAP_THEME", payload:  themeElement.id})
      }

    const returnTheme = (theme: string): JSX.Element =>( 
        <Theme 
            theme={theme}
            onChangeTheme={onChangeTheme}
        />
    );

    return (
        <MapThemesMenuStyled
           ariaLabelledBy={props.ariaLabelledBy} 
           actualRef={menuRef} 
           showUpBar={props.toggleState} 
           id={props.id}
        >
            <List
                items={themes}
                renderChildren={returnTheme}
            />
        </MapThemesMenuStyled>
    )
}

