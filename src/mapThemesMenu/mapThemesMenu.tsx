import React, { FC, MouseEventHandler } from "react"
import styled from "styled-components";
import { Theme } from "./models/Theme";
import { ThemesMenu } from "./styles/mapThemesMenuStyles";


interface MapThemesMenu{
  onChangeTheme: MouseEventHandler<HTMLImageElement>;
}

export const MapThemesMenu:FC<MapThemesMenu> = (props) => {
    const themes = [
        'normal.day',
        'normal.day.grey',
        'normal.day.transit',
        'normal.night',
        'normal.night.grey',
        'reduced.night',            
        'reduced.day',
        'pedestrian.day',
        'pedestrian.night',
    ];
    const thumbnails: JSX.Element[] = themes.map((theme, key) => <Theme theme={theme} key={key} onChangeTheme={props.onChangeTheme}/>);
     
    return (
        <ThemesMenu> {thumbnails} </ThemesMenu>
    )
}