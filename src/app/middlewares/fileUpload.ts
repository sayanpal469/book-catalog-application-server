import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Define the upload folder where the .pdf files will be stored
const UPLOAD_FOLDER = path.join(__dirname, '../.././uplod');

// Create the Multer storage engine
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (_req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
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
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf format allowed'));
  }
};

// Create the Multer instance with the configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5mb
  },
  fileFilter: fileFilter,
}).single('pdf');

export default upload;
