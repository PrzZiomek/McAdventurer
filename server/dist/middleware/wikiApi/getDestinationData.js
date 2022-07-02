"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestinationData = void 0;
const fetch_1 = require("../../helpers/fetch");
const getDestinationData = async (url) => {
    const contentRes = await (0, fetch_1.fetchRes)(url);
    const pageId = contentRes.query.pageids[0];
    const content = contentRes.query.pages[pageId];
    return content;
};
exports.getDestinationData = getDestinationData;
//# sourceMappingURL=getDestinationData.js.map