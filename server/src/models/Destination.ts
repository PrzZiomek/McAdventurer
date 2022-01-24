import { strictEqual } from "assert";
import { type } from "os";
import { destinationRequest } from "../controlers/api/destinationRequest";
import { db } from "../util/database";
import { AllDestination, Destination } from "./types";

type CountObj = { 'COUNT(*)': number }
type ResArray = CountObj[];

export class Destinations {

  private async getDBData(sqlQuery: string) {
    const res = await db.execute(sqlQuery);  
    if(!res) throw new Error("communication with database failed in Destination model");
    const data = Object.values(JSON.parse(JSON.stringify(res)));   
    return data;  
  }

  async getAll(table: string): Promise<AllDestination[] | Destination[]>{
     const destinations = await this.getDBData(`SELECT * FROM ${table}`);
     if(!destinations) throw new Error("communication with database failed in Destination model");
     return destinations[0] as AllDestination[] | Destination[];     
  }

  async getOne(name: string): Promise<Destination>{
    const destinationRes = await this.getDBData(`SELECT * FROM destination WHERE (name = '${name}')`)
    const destArray = destinationRes[0] as Destination[];     
    return destArray[0];
  }

  async checkIfSavedAlready(name: string): Promise<number>{    
    const content = await this.getDBData(`SELECT COUNT(*) FROM destination WHERE name = '${name}'`)
    const contentItem = content[0] as ResArray;
    return contentItem[0]['COUNT(*)'];
  }

  saveOne ({ name, content, coordinates, images }: Destination): void{
    const lat = coordinates.lat === "unset" ? 0 : coordinates.lat;
    const lng = coordinates.lng === "unset" ? 0 : coordinates.lng; 
    db.execute(
      'INSERT INTO destination (name, content, lat, lng, images) VALUES (?, ?, ?, ?, ?)',
      [name, content, lat, lng, images ]
    )
  }

}