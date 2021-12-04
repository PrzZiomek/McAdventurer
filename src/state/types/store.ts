export interface Store{
   callApiReducer: {
      error: Error | null;
      isFetching: boolean;
      destination: {
         content: string,
         images: string,
         lat: number,
         lng: number,
         name: string
      };
      loading: boolean
   };
}