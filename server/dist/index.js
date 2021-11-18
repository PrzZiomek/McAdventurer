"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const destinationRequest_1 = require("./controlers/api/destinationRequest");
const callWikiApi_1 = require("./middleware/callWikiApi");
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//db.execute("SELECT * FROM destinations")
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//app.use(apiRoutes)
app.use("/api/destination", destinationRequest_1.destinationRequest);
app.use("/api/destination", callWikiApi_1.callWikiApi);
app.listen(port, () => {
    console.log(`Serverrrrr start!`);
});
//# sourceMappingURL=index.js.map