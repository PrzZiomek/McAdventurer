import { WikiPage } from '../../models/types';

const fetch = (...args: unknown[]) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetchRes = async (url: string) => await fetch(url).then(res => res.json())   

interface WikiApiResponse{
    query: { 
        pageids: string[];
        pages: { 
            [key: string]: WikiPage
      }
    }
}

export const getDestinationData = async (url: string): Promise<WikiPage> => {
    const contentRes: WikiApiResponse = await fetchRes(url);
    const pageId = contentRes.query.pageids[0];
    const content: WikiPage = contentRes.query.pages[pageId];
    return content;
}