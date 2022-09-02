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
const enums_1 = require("./models/enums");
const Destination_1 = require("./models/Destination");
const DestinationsLanguages_1 = require("./mongoDB/schemas/DestinationsLanguages");
const app = (0, express_1.default)();
const port = process.env.wORT;
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
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(async () => {
    const destM = new Destination_1.Destinations();
    const allDestination = await destM
        .getAll(enums_1.Table.Destination)
        .catch(err => console.log(err));
    const newDests = new DestinationsLanguages_1.DestinationsLanguages({ items: allDestination });
    const saveDests = await newDests.save();
    console.log("connect to mongoDB");
    app.listen(port, () => {
        console.log(`Serverrrrr start!`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map