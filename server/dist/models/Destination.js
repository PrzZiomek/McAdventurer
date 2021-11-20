"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = void 0;
const database_1 = require("../util/database");
class Destination {
    saveUser({ name, content, coordinates, images }) {
        database_1.db.execute('INSERT INTO destinations (name, content, coordinates, images) VALUES (?, ?, ?, ?)', [name, content, coordinates, images]);
    }
}
exports.Destination = Destination;
//# sourceMappingURL=Destination.js.map