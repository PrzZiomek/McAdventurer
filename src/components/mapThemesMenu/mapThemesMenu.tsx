 import React, { useState, FC, useEffect, useRef, MutableRefObject, Dispatch, MouseEvent } from "react"
import { useDispatch } from "react-redux";
import { useDetectOutsideClick } from "../../customHooks/useDetectOutsideClick";

import { Theme } from "./models/Theme";
import { ThemesMenu, MapThemesMenuStyled } from "./styles/mapThemesMenuStyles";


interface MapThemesMenu{
    toggleState: boolean;
    setShowThemes: Dispatch<React.SetStateAction<boolean>>;
} 

export const MapThemesMenu: FC<MapThemesMenu> = (props) => { 

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

    const thumbnails: JSX.Element[] = themes.map((theme, key) => // TO MEMO (?)
        <Theme 
            theme={theme}
            key={key} 
            onChangeTheme={onChangeTheme}
        />);
        
    return (
        <MapThemesMenuStyled actualRef={menuRef} showUpBar={props.toggleState} id="themesBar">
            <ThemesMenu className="themesMenu"> {thumbnails} </ThemesMenu>
        </MapThemesMenuStyled>
    )
}