"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const request_1 = __importDefault(require("request"));
const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const requestOptions = {
        url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts&exintro&explaintext&format=json&exintro=1&indexpageids`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    (0, request_1.default)(requestOptions, function (err, response, body) {
        try {
            if (err)
                console.log("error when calling api: ", err);
            const reqRes = JSON.parse(body);
            const pageId = reqRes.query.pageids[0];
            const pageContent = reqRes.query.pages[pageId];
            console.log(pageContent.extract);
        }
        catch (ex) {
        }
    });
    next();
};
exports.callWikiApi = callWikiApi;
//format=json&action=query&prop=extracts&exintro&explaintext
//# sourceMappingURL=callWikiApi.js.map