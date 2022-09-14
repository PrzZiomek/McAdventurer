"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    console.log("in error handler?!?~!?!?!?!?!!?!?!?????????????????????!!!");
    console.log(err);
    res.status(err.statusCode).send({ message: err.name });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleErrors.js.map