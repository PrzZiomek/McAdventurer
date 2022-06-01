
export type MapThemeAction = { 
   type: string,
   payload: string
};

export type MapThemeInitialState = {
   theme: string | null
 };

export const mapThemeInitialState: MapThemeInitialState = {
   theme: "normal.day"
};


export const getMapTheme = (state = mapThemeInitialState, action: MapThemeAction) => ({
      ...state,
      theme: action.payload
})


