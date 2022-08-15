"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callWikiApi = void 0;
const fetch = (...args) => Promise.resolve().then(() => __importStar(require('node-fetch'))).then(({ default: fetch }) => fetch(...args));
const fetchRes = async (url) => await fetch(url).then(res => res.json());
const pageImagesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=images&format=json";
const pageCoordinatesUrl = "https://en.wikipedia.org/w/api.php?action=query&titles={name}&prop=coordinates&format=json";
const callWikiApi = async (req, res, next) => {
    const name = res.locals.destinationName;
    const requestOptions = {
        url: `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=extracts|coordinates|pageimages&exintro&explaintext&format=json&exintro=1&indexpageids`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const [contentRes] = await Promise.all([
            fetchRes(requestOptions.url)
        ]);
        const pageId = contentRes.query.pageids[0];
        const content = contentRes.query.pages[pageId];
       // console.log(content);
    }
    catch (ex) {
        console.log(ex); // TO DO   
    }
    next();
};
exports.callWikiApi = callWikiApi;
