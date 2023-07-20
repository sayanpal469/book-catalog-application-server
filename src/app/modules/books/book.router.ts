import express from 'express';
import fileUpload from '../../middlewares/fileUpload';
// import validateRequest from '../../middlewares/validateRequest';
// import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  // validateRequest(BookValidation.bookZodSchema),
  fileUpload,
  BookController.createBook,
);
router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getSingelBook);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
