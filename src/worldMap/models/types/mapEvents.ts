
export interface MapEvent extends Event{
    newValue: {
        lookAt: {
            position:{
              lat: number;
              lng: number;   
            };
            zoom: number;
        }
    }
}

export const isMapEvent = (e: Event, type: string): e is MapEvent => {
    return e.type === type;
  }