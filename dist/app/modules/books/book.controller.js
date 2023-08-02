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
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const book_services_1 = require("./book.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const book_constant_1 = require("./book.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reviews = [];
    if (req.body.reviewer && req.body.reviewText) {
        for (const review of reviews) {
            const { reviewText, reviewer } = review;
            reviews.push({ reviewer, reviewText });
        }
    }
    console.log(req.file);
    const result = yield book_services_1.BookService.createBook({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
        image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        description: req.body.description,
        reviews: req.body.reviews,
    });
    console.log(req.body);
    // console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const searchTerm = (_b = req.query.searchTerm) === null || _b === void 0 ? void 0 : _b.toString();
    if (searchTerm && book_constant_1.bookSearchbleFields.includes(searchTerm)) {
        filters.searchTerm = searchTerm;
    }
    const result = yield book_services_1.BookService.getAllBook(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Books retrieve successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingelBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_services_1.BookService.getSingelBook(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Book retrieve successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dataToUpdate = req.body;
    if (req.file) {
        dataToUpdate.image = req.file.filename;
    }
    const result = yield book_services_1.BookService.updateBook(id, dataToUpdate);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_services_1.BookService.deleteBook(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
    });
}));
exports.BookController = {
    createBook,
    getAllBook,
    getSingelBook,
    updateBook,
    deleteBook,
};
