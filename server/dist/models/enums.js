"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusCodes = exports.Collection = void 0;
var Collection;
(function (Collection) {
    Collection["DESTINATIONS_LANGUAGES"] = "destinationslanguages";
    Collection["WIKI_DESTINATIONS"] = "wikidestinations";
    Collection["DESTINATIONS"] = "destinations";
})(Collection = exports.Collection || (exports.Collection = {}));
var httpStatusCodes;
(function (httpStatusCodes) {
    httpStatusCodes[httpStatusCodes["OK"] = 200] = "OK";
    httpStatusCodes[httpStatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpStatusCodes[httpStatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpStatusCodes[httpStatusCodes["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(httpStatusCodes = exports.httpStatusCodes || (exports.httpStatusCodes = {}));
//# sourceMappingURL=enums.js.map