"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('upload'));
app.use('/api/v1', routes_1.default);
app.use(globalErrorHandler_1.default);
// Wrong API error handler
app.use((req, res, next) => {
    console.log(req);
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
app.get('/', (req, res) => {
    res.send('SERVER RUNNING');
});
exports.default = app;
