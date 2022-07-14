import { strictEqual } from "assert";
import { type } from "os";
import { destinationRequest } from "../controlers/api/destinationRequest";
import { db } from "../util/database";
import { AllDestination, Destination, DestinationTransitType } from "./types";

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
  
  async getOne(arg: string): Promise<Destination>;
  async getOne(arg:{ lat: string, lng: string }, table: string): Promise<Destination>;
  async getOne(arg:{ lat: string, lng: string } | string, table?: string): Promise<Destination>{
    if(typeof arg === "string"){
      const destinationRes = await this.getDBData(`SELECT * FROM destination WHERE (name = '${arg}')`)
      const destArray = destinationRes[0] as Destination[];     
      return destArray[0];
    }else{
      const destinationRes = await this.getDBData(`SELECT * FROM ${table} WHERE (lat = "${arg.lat}") and (lng = "${arg.lng}")`)
      const destArray = destinationRes[0] as Destination[];     
      return destArray[0];
    }
  }

  async getOneCoords(name: string): Promise<Destination>{
    const destinationRes = await this.getDBData(`SELECT LAT, LNG FROM destinations_list WHERE (CITY = '${name}')`)
    const destArray = destinationRes[0] as Destination[];     console.log("raw mres cords 0", destinationRes[0]);   
    return destArray[0];
  }

  async checkIfSavedAlready(name: string): Promise<number>{    
    const content = await this.getDBData(`SELECT COUNT(*) FROM destination WHERE name = '${name}'`)
    const contentItem = content[0] as ResArray; console.log("contentItem", contentItem);
    
    return contentItem[0]['COUNT(*)'];
  }

  saveOne ({ name, content, coordinates , images }: DestinationTransitType): void{
    const lat = coordinates?.lat === "unset" ? 0 : coordinates?.lat;
    const lng = coordinates?.lng === "unset" ? 0 : coordinates?.lng; console.log("cords bef save ", coordinates?.lat, coordinates?.lng);   
    db.execute(
      'INSERT INTO destination (name, content, lat, lng, images) VALUES (?, ?, ?, ?, ?)',
      [name, content, lat, lng, images ]
    )
  }

}