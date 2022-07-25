
export const pickIfMatch = (value: string) => ({name}: {name: string}): boolean | undefined => { 
   for(let i = 30; i > 0; i--){
       if(value.length > i){    
           const piece = i + 1;        
           return name.toLowerCase().slice(0, piece) === value.slice(0, piece);
       } 
   }        
};        