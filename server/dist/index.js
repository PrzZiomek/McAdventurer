"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const main_1 = require("./routes/api/main");
const handleErrors_1 = require("./middleware/handleErrors");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, compression_1.default)({ threshold: 512 }));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(main_1.apiRoutes);
app.use(handleErrors_1.handleErrors);
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(async () => {
    console.log("connect to mongoDB");
})
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`Serverrrrr start on `, port);
});
//# sourceMappingURL=index.js.map