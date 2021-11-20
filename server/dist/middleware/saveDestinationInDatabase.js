"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDestinationInDatabase = void 0;
const saveDestinationInDatabase = (req, res, next) => {
    const destination = res.locals.destination;
    console.log("dest:", destination);
    next();
};
exports.saveDestinationInDatabase = saveDestinationInDatabase;
//# sourceMappingURL=saveDestinationInDatabase.js.map