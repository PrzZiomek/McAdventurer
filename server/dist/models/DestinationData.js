"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationData = void 0;
const getCollection_1 = require("../mongoDB/utils/getCollection");
const passNotFoundError_1 = require("./error/passNotFoundError");
class DestinationData {
    async getList(collectionName) {
        const coll = await (0, getCollection_1.getCollection)(collectionName).catch(() => (0, passNotFoundError_1.passNotFoundError)("db or destination collection not found"));
        const data = await (coll === null || coll === void 0 ? void 0 : coll.find({}).toArray());
        return data[0].items;
    }
    async getOne(collectionName, key) {
        const destsColl = await (0, getCollection_1.getCollection)(collectionName).catch(() => (0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found"));
        const res = await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.findOne(key)); //as Collection;
        return res;
    }
    async setOne(collectionName, item) {
        const destsColl = await (0, getCollection_1.getCollection)(collectionName).catch(() => (0, passNotFoundError_1.passNotFoundError)("db or wiki destination collection not found"));
        await (destsColl === null || destsColl === void 0 ? void 0 : destsColl.insertOne(item));
    }
}
exports.DestinationData = DestinationData;
//# sourceMappingURL=DestinationData.js.map