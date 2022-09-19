import { getCollection } from "../mongoDB/utils/getCollection";
import { passNotFoundError } from "./error/passNotFoundError";


export class DestinationData {
  
   async getList<T>(collectionName: string): Promise<T[]>{
      const coll = await getCollection(collectionName).catch(() => passNotFoundError("db or destination collection not found"));
      const data: [{ items: T[] }] = await coll?.find({}).toArray();
      return data[0].items;
   }

   async getOne<T>(collectionName: string, key: object): Promise<T>{
      const destsColl = await getCollection(collectionName).catch(() => passNotFoundError("db or wiki destination collection not found"));
      const res: T = await destsColl?.findOne(key) //as Collection;
      return res;
   }

   async setOne<T>(collectionName: string, item: T): Promise<void>{
      const destsColl = await getCollection(collectionName).catch(() => passNotFoundError("db or wiki destination collection not found"));
      await destsColl?.insertOne(item);
   }
}