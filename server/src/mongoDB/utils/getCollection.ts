import * as mongoDB from "mongodb";


export const getCollection = async (name: string) => {

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_CONNECT!);
           
   await client.connect();
       
   const db: mongoDB.Db = client.db("test");
  
   const collection: mongoDB.Collection = db.collection(name);

   return collection;
   
}