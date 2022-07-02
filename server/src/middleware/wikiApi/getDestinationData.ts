import { fetchRes } from '../../helpers/fetch';
import { WikiPage } from '../../models/types';


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