"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const resData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    };
    res.status(data.statusCode).json(resData);
};
exports.default = sendResponse;
