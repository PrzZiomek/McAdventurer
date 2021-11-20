
const fetch = (...args: unknown[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetchRes = async (url: string) => await fetch(url).then(res => res.json())   

interface WikiApiResponse{
    query: { 
        pageids: string[];
        pages: { 
            [key: string]: {
                pageid: number,
                ns: number,
                title: string,
                extract: string,
                coordinates: [ 
                    { 
                      lat: number, 
                      lon: number, 
                     } 
                ], 
                pageimage: string
        }
      }
    }
}

export const getDestinationData = async (url: string) => {
    const contentRes: WikiApiResponse = await fetchRes(url);
    const pageId = contentRes.query.pageids[0];
    const content = contentRes.query.pages[pageId];
    return content;
}