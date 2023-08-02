"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./shared/logger");
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
let server;
process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    logger_1.errorlogger.error(err);
    process.exit(1);
});
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.set('strictQuery', false);
        yield mongoose_1.default.connect(config_1.default.db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger_1.logger.info('DB Connected');
        app_1.default.listen(config_1.default.port, () => {
            logger_1.logger.info(`Server is running at http://localhost:${config_1.default.port}`);
        });
    }
    catch (error) {
        logger_1.errorlogger.error('Error connecting to the database:', error);
    }
    process.on('unhandledRejection', err => {
        // eslint-disable-next-line no-console
        console.log('Unhandeled rejection is detected, we are closing our server....');
        if (server) {
            server.close(() => {
                logger_1.errorlogger.error(err);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
});
connectDb();
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});
