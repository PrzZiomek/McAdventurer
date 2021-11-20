import { db } from "../util/database";

export interface Destination {
    name: string;
    content:string;
    coordinates: {
        lat: number,
        lng: number
    };
    images: unknown
}

export class Destination {

  saveUser({ name, content, coordinates, images }: Destination): void{
        db.execute(
          'INSERT INTO destinations (name, content, coordinates, images) VALUES (?, ?, ?, ?)',
          [ name, content, coordinates, images ]
        )
    }
}