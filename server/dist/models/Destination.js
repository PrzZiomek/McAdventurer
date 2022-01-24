"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destinations = void 0;
const database_1 = require("../util/database");
class Destinations {
    async getDBData(sqlQuery) {
        const res = await database_1.db.execute(sqlQuery);
        if (!res)
            throw new Error("communication with database failed in Destination model");
        const data = Object.values(JSON.parse(JSON.stringify(res)));
        return data;
    }
    async getAll(table) {
        const destinations = await this.getDBData(`SELECT * FROM ${table}`);
        if (!destinations)
            throw new Error("communication with database failed in Destination model");
        return destinations[0];
    }
    async getOne(name) {
        const destinationRes = await this.getDBData(`SELECT * FROM destination WHERE (name = '${name}')`);
        const destArray = destinationRes[0];
        return destArray[0];
    }
    async checkIfSavedAlready(name) {
        const content = await this.getDBData(`SELECT COUNT(*) FROM destination WHERE name = '${name}'`);
        const contentItem = content[0];
        return contentItem[0]['COUNT(*)'];
    }
    saveOne({ name, content, coordinates, images }) {
        const lat = coordinates.lat === "unset" ? 0 : coordinates.lat;
        const lng = coordinates.lng === "unset" ? 0 : coordinates.lng;
        database_1.db.execute('INSERT INTO destination (name, content, lat, lng, images) VALUES (?, ?, ?, ?, ?)', [name, content, lat, lng, images]);
    }
}
exports.Destinations = Destinations;
//# sourceMappingURL=Destination.js.map