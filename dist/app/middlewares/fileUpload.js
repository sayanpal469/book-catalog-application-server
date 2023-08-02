"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the upload folder where the .pdf files will be stored
const UPLOAD_FOLDER = path_1.default.join(__dirname, '../../../upload');
// console.log(__dirname)
// Create the Multer storage engine
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (_req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') +
            '-' +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
// Define the file filter to allow only .pdf files
const fileFilter = (_req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .png, .jpg, and .jpeg formats are allowed'));
    }
};
// Create the Multer instance with the configuration
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5000000, // 5mb
    },
    fileFilter: fileFilter,
}).single('image');
exports.default = upload;
